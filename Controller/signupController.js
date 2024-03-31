const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const asyncHandeller = require('express-async-handler');
const ApiError = require('../utils/apiError');
const teacherModel = require('../Model/teacherModel');

const generateToken = (payload) =>
    jwt.sign(
        {teacherId:payload} ,
        "process.env.JWT_SECRET", {
            expiresIn: "1hr"},
);

exports.signup = asyncHandeller(async(req , res , next) => {
    //1- create teacher
    const teacher = await teacherModel.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    const token = generateToken(teacher._id);

    res.status(201).json({data: teacher , token})
});

exports.login = asyncHandeller(async(req , res , next) => {
    //1- check if pass and mail is exit
        const teacher = await teacherModel.findOne({email:req.body.email});
        if(!teacher || !(await bcrypt.compare(req.body.password , teacher.password))) {
            return next(new ApiError("incorect email or pass"),401 )
        }

        const token = generateToken(teacher._id);
        // console.log("token is " , token);
        res.status(200).json({data: teacher , token})

});