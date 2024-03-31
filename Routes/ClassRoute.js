const express = require("express");
const router = express.Router();
const controller = require("../Controller/classController");
const {insertValidator, updateValidator,deleteValidator} = require("../Midelwares/validation/classValidation")
const validatonResult = require("../Midelwares/validation/validationsResault")
const AuthService = require('../Midelwares/validation/authTeacherValidator')



router
    .route("/class")
    .get(AuthService.protect,controller.getAllClasses)
    .post(AuthService.allowTo('admin'),insertValidator,validatonResult,controller.insertClass);

router
    .route("/class/:id")
    .get(controller.getClassById)
    .patch(updateValidator,validatonResult,controller.updateClass)
    .delete(deleteValidator,validatonResult,controller.deleteClass);  
    
router
    .route("/class/teacher/:id")   
    .get(controller.classSupervisorInfo);

router
    .route("/class/child/:id")    
    .get(controller.classChildrenInfo);
    
module.exports = router;    

