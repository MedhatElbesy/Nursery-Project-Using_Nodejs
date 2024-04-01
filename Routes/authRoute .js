const express = require("express");
const router = express.Router();

const {signupValidator,loginValidator} = require("../Midelwares/validation/authTeacherValidator");
const {signup,login} = require('../Controller/signupController');
const validatonResult = require("../Midelwares/validation/validationsResault");


router 
    .route("/signup")
    .post(signupValidator,validatonResult,signup);


router 
    .route("/login")
    .post(loginValidator,validatonResult,login);

module.exports = router;    