const express = require("express");
const router = express.Router();
// const { v4: uuidv4 } = require('uuid');

const controller = require("../Controller/teachersController");
const {
    insertValidator,
    updateValidator,
    deleteValidator,
    changePasswordValidator
    } = require("../Midelwares/validation/teacherValidator");
const {uploadTeacherImage,resizeImage,changePass} = require('../Controller/teachersController');
const validatonResult = require("../Midelwares/validation/validationsResault");
const isAuthorized = require("./../Midelwares/authenticationMW");
const protectt = require('../Midelwares/validation/authTeacherValidator')


router.route('/changepass/:id')
    .patch(changePasswordValidator,validatonResult,changePass)

router 
    .route("/teachers")
    .get(controller.getAllTeachers)
    .post(protectt.protect,uploadTeacherImage,resizeImage,insertValidator,validatonResult,controller.insertTeacher);
    
router
    .route("/teachers/:id")
    .get(controller.getTeacherById)
    .patch(updateValidator,validatonResult,controller.updateTeacher)
    .delete(deleteValidator,validatonResult,controller.deleteTeacher)

router
    .route("/teachers/supervisors/:id")   
    .get(controller.allClassSupervisors);

module.exports = router;    