const { body, param, query } = require("express-validator");
const childSchema = require("../../Model/childModel");
const asyncHandeller = require('express-async-handler');
const teacherModel = require('../../Model/teacherModel')
const ApiError = require('../../utils/apiError');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { escape } = require("querystring");

exports.signupValidator = [

    body("fullName")
        .isAlpha()
        .withMessage("Teacher full Name should be string")
        .isLength({ min: 5 })
        .withMessage(" Teacher full Name lenght>5"),

    body("email")
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage("Email have ashape")
        .custom((val) =>
        teacherModel.findOne({ email: val }).then((user) => {
        if (user) {
            return Promise.reject(new Error('E-mail already in use'));
        }
        })
    ),

    body("password")
        .isStrongPassword()
        .withMessage(" Pass must be strong"),

    body('passwordConfirm')
        .notEmpty()
        .withMessage('Password confirmation required'),
];

exports.loginValidator = [

    
    body("email")
        .notEmpty()
        .withMessage("Email required")
        .isEmail()
        .withMessage("Email have ashape"),

    body("password")
        .notEmpty()
        .withMessage("password required")
        
];

exports.protect = asyncHandeller(async(req , res , next) => {
    // 1- check if token exist
    let token;
    if(req.headers.authorization  ){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next (new ApiError('Please login to get access', 401))
    };
    // 2- check if it expire or no change happend
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    // 3- check if user exit
    const currentUser = await teacherModel.findById(decoded.teacherId);
    if (!currentUser) {
    return next(new ApiError('The user that belong to this token does no longer exist',401));
    }
    // 4- check if no change in pass after token created
    if(currentUser.passwordChangedAt){
        const passTimeChange = parseInt(
            currentUser.passwordChangedAt.getTime() / 1000 ,10
        );
        if(passTimeChange > decoded.iat){
            return next(new ApiError('teacher changed his pass , please login',401));
        }
    }
    req.teacher = currentUser;
    next();
});

exports.allowTo = (...roles) =>
    asyncHandeller(async (req, res, next) => {
        if (!roles.includes(req.teacher.role)) {
            return next(new ApiError('You are not allowed to access this route', 403));
        }
    next();
});

