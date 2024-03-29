const multer  = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandeller = require('express-async-handler');


const bcrypt = require("bcrypt");
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds);
// const productModel = require('../Model/teacherModel');
// const ApiError = require('../utils/apiError');
const teacherSchema = require("../Model/teacherModel");
const classSchema = require("../Model/classModel");
const {uploadeSingleImage} = require('../Midelwares/uploadeImageMiddleware');

exports.uploadTeacherImage = uploadeSingleImage("image");

exports.resizeImage = asyncHandeller( async(req , res , next) =>{
    const uniqueFileName = `teacher-${uuidv4()}-${Date.now()}.jpeg`;
    // console.log(req.file);
    await sharp(req.file.buffer)
        .resize(600,600)
        .toFormat("jpeg")
        .jpeg({quality:90})
        .toFile(`uploads/teachers/${uniqueFileName}`);
    
        //save image in db
    req.body.image = uniqueFileName ;
    next();
});



exports.getAllTeachers = (req , res  ,next) => {
    teacherSchema.find({})
    .then((data) => {
        res.status(200).json({data});
    })
    .catch((error) => next(error));
};

exports.getTeacherById = (req , res ,next) => {
    teacherSchema.findOne({ _id: req.params.id })
    .then((object)=>{
        if (!object) {
            throw new Error("teacher not Exists");
        }
        res.status(200).json({ object });
    })
    .catch((error) => next(error));
};

// exports.insertTeacher = (req , res , next) => {
//     let object = new teacherSchema(req.body);
//     object
//     .save()
//     .then((data) => {
//         res.status(200).json({ data });
//     })
//     .catch((error) => next(error));
// };

exports.insertTeacher = 
asyncHandeller(async(req , res,next)=>{
    const newDocument = await teacherSchema.create(req.body);
    res.status(201).json({ data: newDocument });
}
);


exports.updateTeacher = asyncHandeller(async(req , res , next) => {
    const updatedBrand = await userModel.findByIdAndUpdate(
        req.params.id,
        {
            fullName:req.body.fullName,
            email:req.body.email,
        },
        {new:true});

    if(!updatedBrand){
        return next(new ApiError(`Can not update this Id : ${req.params.id}`) , 404);
    }
    res.status(200).json({data:updatedBrand})
});



// exports.updateTeacher = (req , res , next) => { 
//     teacherSchema.updateOne({
//         _id:req.params.id
//     },{
//         $set:{
//             fullName:req.body.fullName,
//             email:req.body.email,
//             // password:req.body.password
//         }
//     }).then(data=>{
//         if(data.matchedCount==0)
//             next(new Error("Teacher not Found"));
//         else
//             res.status(200).json({data});
//     })
//     .catch(error=>next(error));
// };

exports.changePass = asyncHandeller(async(req , res , next) => {
    const updatedBrand = await userModel.findByIdAndUpdate(
        req.params.id,
        {
            password:await bcrypt.hash(req.body.password,12)
        },
        {new:true});

    if(!updatedBrand){
        return next(new ApiError(`Can not update this Id : ${req.params.id}`) , 404);
    }
    res.status(200).json({data:updatedBrand})
});

exports.deleteTeacher = (req , res , next) => {
    teacherSchema.deleteOne({
        _id:req.params.id
    }).then(data=>{
        res.status(200).json({data});
    })
    .catch(error=>next(error));
};

exports.allClassSupervisors = (req , res , next) => {
    classSchema.find({supervisor: req.params.id})
    .then((data) => {
        res.status(200).json({data});
    })
    .catch((error) => next(error));
};