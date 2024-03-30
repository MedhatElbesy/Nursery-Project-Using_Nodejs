const { body, param, query } = require("express-validator");
const childSchema = require("../../Model/childModel");
const asyncHandeller = require('express-async-handler');
const teacherModel = require('../../Model/teacherModel')


exports.signupValidator = [

    body("fullName")
        .isAlpha()
        .withMessage("Teacher full Name should be string")
        .isLength({ min: 5 })
        .withMessage(" Teacher full Name lenght>5"),

    body("password")
        .isStrongPassword()
        .withMessage(" Pass must be strong"),

    body("email")
        .isEmail()
        .withMessage("Email have ashape")
        .custom((val) =>
            teacherModel.findOne({ email: val }).then((teacher) => {
                if (teacher) {
                return Promise.reject(new Error('E-mail already in teacher'));
                }
            }))
];

exports.loginValidator = [

    
    body("email")
        .isEmail()
        .withMessage("Email have ashape"),

    body("password")
        .notEmpty()
        .withMessage("password required")
        .isStrongPassword()
        .withMessage(" Pass must be strong"),

];

