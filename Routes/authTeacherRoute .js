const express = require("express");
const router = express.Router();

const controller = require("../Controller/teachersController");
const {signupValidator,loginValidator} = require("../Midelwares/validation/authTeacherValidator");
const {signup,login} = require('../Controller/signupController');
const validatonResult = require("../Midelwares/validation/validationsResault");
// const isAuthorized = require("./../Midelwares/authenticationMW");





// router 
//     .route("/teachers/signup")
//     .post(signupValidator,signup);
    
// router 
//     .route("/teachers/login")
//     .post(loginValidator,login);
    // router
    // .route("/teachers/:id")
    // .get(controller.getTeacherById)
    // .patch(updateValidator,validatonResult,controller.updateTeacher)
    // .delete(deleteValidator,validatonResult,controller.deleteTeacher)

router
    .route("/teachers/supervisors/:id")   
    .get(controller.allClassSupervisors);

module.exports = router;    