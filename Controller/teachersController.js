const multer  = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
const asyncHandeller = require('express-async-handler');
const fs = require("fs");

const teacherSchema = require("../Model/teacherModel");
const classSchema = require("../Model/classModel");
const {uploadeSingleImage} = require('../Midelwares/uploadeImageMiddleware');
const validationResult = require('../Midelwares/validation/validationsResault')



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

exports.insertTeacher = asyncHandeller(async(req , res,next)=>{
    const newDocument = await teacherSchema.create(req.body);
    res.status(201).json({ data: newDocument });
}
);

exports.updateTeacher = asyncHandeller(async(req , res , next) => {
    const teacherUpdate = await teacherSchema.findByIdAndUpdate(
        req.params.id,
        {
            fullName:req.body.fullName,
            email:req.body.email,
        },
        {new:true});

    if(!teacherUpdate){
        return next(new ApiError(`Can not update this Id : ${req.params.id}`) , 404);
    }
    res.status(200).json({data:teacherUpdate})
});

exports.changePass = asyncHandeller(async(req , res , next) => {
    const updatePass = await teacherSchema.findByIdAndUpdate(
        req.params.id,
        {
            password : await bcrypt.hash(req.body.password,12),
            passwordChangedAt: Date.now()
        },
        {new:true});

    if(!updatePass){
        return next(new ApiError(`Can not update this Id : ${req.params.id}`) , 404);
    }
    res.status(200).json({data:updatePass})
});

exports.deleteTeacher = asyncHandeller(async (req, res, next) => {
    const data = await teacherSchema.findOneAndDelete({
        _id: req.params.id,
    });

    if (!data) {
        return res.status(404).json({ message: "Teacher not found" });
    }

    if (data.image) {
        const deletedImagePath = `./uploads/teachers/${data.image}`;
        try {
            await fs.unlinkSync(deletedImagePath);
        } catch (err) {
            return next(err);
        }
    }

    res.status(200).json({ message: "Teacher deleted successfully" });
});

exports.allClassSupervisors = (req , res , next) => {
    classSchema.find({supervisor: req.params.id})
    .then((data) => {
        res.status(200).json({data});
    })
    .catch((error) => next(error));
};