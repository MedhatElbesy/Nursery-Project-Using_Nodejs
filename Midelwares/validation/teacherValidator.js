const { body, param, query, check} = require("express-validator");
const asyncHandeller = require('express-async-handler');
const  bcrypt = require('bcryptjs');

const childSchema = require("../../Model/childModel");
const teacherModel = require('../../Model/teacherModel')

exports.insertValidator = [

    body("fullName")
        .isAlpha()
        .withMessage("Teacher full Name should be string")
        .isLength({ min: 5 })
        .withMessage(" Teacher full Name lenght>5"),

    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .custom((password, { req }) => {
            if (password !== req.body.passwordConfirm) {
                throw new Error('Password Confirmation incorrect');
            }
            return true;
        }
    ),

    check('passwordConfirm')
        .notEmpty()
        .withMessage('Password confirmation required'),

    body("email")
        .isEmail()
        .withMessage("Email have ashape")
        .custom((val) =>
            teacherModel.findOne({ email: val }).then((teacher) => {
                if (teacher) {
                    return Promise.reject(new Error('E-mail already in teacher'));
                }
            })
        )
];

exports.updateValidator = [

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

exports.changePasswordValidator = [

    body("currentPassword")
        .notEmpty()
        .withMessage("you must enter currentPassword"),
        
    body("passwordComfirm")
        .notEmpty()
        .withMessage("you must enter passwordComfirm"),

    body("password")
        .notEmpty()
        .withMessage("you must enter New Password")
        .custom(async(val,{req}) => {
            // verify current password
            const teacher = await teacherModel.findById(req.params.id)
            if(!teacher){
                throw new Error('There is no teacher for this id');
            }
            const isCorrectPassword = await bcrypt.compare(
                req.body.currentPassword,
                teacher.password
            );

            if (!isCorrectPassword) {
                throw new Error('Incorrect current password');
            }
            // verify comfirm password
            if(val !== req.body.passwordComfirm){
                throw new Error('Password Comfirm incorrect');
            }
            return true;
        }),
];

exports.deleteValidator = [
    param('_id')
        // .isMongoId()
        // .withMessage('ID must be a valid MongoDB ObjectId')
        .custom(asyncHandeller(async (_id) => {
            const classesCount = await childSchema.countDocuments({ supervisor: _id });
            if (classesCount > 0) {
                throw new Error('Teacher cannot be deleted as it belong to classes.');
            }
        }))
];