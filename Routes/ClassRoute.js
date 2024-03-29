const express = require("express");
const router = express.Router();
const controller = require("../Controller/classController");
const {insertValidator, updateValidator,deleteValidator} = require("../Midelwares/validation/classValidation")
const validatonResult = require("../Midelwares/validation/validationsResault")
router
    .route("/class")
    .get(controller.getAllClasses)
    .post(insertValidator,validatonResult,controller.insertClass)
    // .patch(updateValidator,validatonResult,controller.updateClass)
    // .delete(controller.deleteClass);

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

