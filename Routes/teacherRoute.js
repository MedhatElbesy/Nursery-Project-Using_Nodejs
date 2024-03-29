const express = require("express");
const router = express.Router();
// const { v4: uuidv4 } = require('uuid');

const controller = require("../Controller/teachersController");
const {
    insertValidator,
    updateValidator,
    deleteValidator
    } = require("../Midelwares/validation/teacherValidator");
const {uploadTeacherImage,resizeImage,uploadTeachetImage} = require('../Controller/teachersController');
const validatonResult = require("../Midelwares/validation/validationsResault");
const isAuthorized = require("./../Midelwares/authenticationMW");


router 
    .route("/teachers")
    .get(controller.getAllTeachers)
    .post(uploadTeacherImage,resizeImage,insertValidator,validatonResult,controller.insertTeacher);
    
    router
    .route("/teachers/:id")
    .get(controller.getTeacherById)
    .patch(updateValidator,validatonResult,controller.updateTeacher)
    .delete(deleteValidator,validatonResult,controller.deleteTeacher)

router
    .route("/teachers/supervisors/:id")   
    .get(controller.allClassSupervisors);

module.exports = router;    