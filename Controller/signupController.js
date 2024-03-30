const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const asyncHandeller = require('express-async-handler');
const ApiError = require('../utils/apiError');
const teacherModel = require('../Model/teacherModel');

const generateToken = (payload) =>
    jwt.sign(
        {teacherId:payload} ,
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRATION}
);

exports.signup = asyncHandeller(async(req , res , next) => {

    //1- create teacher
    const teacher = await teacherModel.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    //2- generate token
    // const token = jwt.sign(
    //     {teacherId:teacherModel._id} ,
    //     process.env.JWT_SECRET,
    //     {expiresIn: process.env.JWT_EXPIRATION}
    //     );
    const token = generateToken(teacherModel._id);

    res.status(201).json({data: teacher , token})

});

exports.login = asyncHandeller(async(req , res , next) => {
    //1- check if pass and mail is exit
        const user = await teacherModel.findOne({email:req.body.email});
        if(!user || !(await bcrypt.compare(req.body.password , user.password))) {
            return next(new ApiError("incorect email or pass"),401 )
        }

        const token = generateToken(teacherModel._id);
        res.status(200).json({data: user , token})

});