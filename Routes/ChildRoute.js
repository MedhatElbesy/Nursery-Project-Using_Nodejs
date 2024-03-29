const express = require("express");
const router = express.Router();
const controller = require("../Controller/childController");
const {insertValidator,
        updateValidator,
        deleteValidator} = require("../Midelwares/validation/childValidator");
const {uploadChildImage,
        resizeImage} = require('../Controller/childController')
const validatonResult = require("../Midelwares/validation/validationsResault")

router
    .route("/child")
    .get(controller.getAllChild)
    .post(uploadChildImage,
        resizeImage,
        insertValidator,
        validatonResult,
        controller.insertChild
    );


router
    .route("/child/:id")
    .get(controller.getChildById)
    .patch(uploadChildImage,
        resizeImage,
        updateValidator,
        validatonResult,
        controller.updateChild
    )
    .delete(deleteValidator,
        validatonResult,
        controller.deleteChild
    );    

module.exports = router;    