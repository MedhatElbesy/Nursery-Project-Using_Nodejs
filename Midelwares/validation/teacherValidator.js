const { body, param, query } = require("express-validator");
const childSchema = require("../../Model/childModel");
const asyncHandeller = require('express-async-handler');
const teacherModel = require('../../Model/teacherModel')
exports.insertValidator = [
  

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
exports.updateValidator = [
    body("_id")
    .isMongoId()
    .withMessage("Enter valid mongo id"),
    
    body("fullName")
        .optional()
        .isAlpha()
        .withMessage("Teacher full Name should be string")
        .isLength({ min: 5 })
        .withMessage(" Teacher full Name lenght>5"),

    body("password")
        .isStrongPassword()
        .optional()
        .withMessage(" Pass must be strong"),

    body("email")
        .isEmail()
        .optional()
        .withMessage("Email have ashape")
        
];

exports.deleteValidator = [
    param('_id')
        .isMongoId()
        .withMessage('ID must be a valid MongoDB ObjectId')
        .custom(asyncHandeller(async (_id) => {
            const classesCount = await childSchema.countDocuments({ supervisor: _id });
            if (classesCount > 0) {
                throw new Error('Teacher cannot be deleted as they are associated with existing classes.');
            }
        }))
];