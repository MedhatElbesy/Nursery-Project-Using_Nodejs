const { body, param, query } = require("express-validator");
const teacherSchema = require("../../Model/teacherModel");
const childSchema = require("../../Model/childModel");
const asyncHandeller = require('express-async-handler');

exports.insertValidator = [
    body("id")
        .isInt()
        .withMessage(" id should be integer"),

    body("name")
        .isAlpha()
        .withMessage(" full Name should be string")
        .isLength({ min: 5 })
        .withMessage("  full Name lenght>5"),

    body("supervisor")
    .isMongoId()
    .withMessage(" supervisor must be mongo")
    .notEmpty()
    .withMessage('supervisor must belong to supervisors')
    .custom(asyncHandeller(async (val) =>{
        const object = await teacherSchema.findOne({ _id: val });
        if (!object) throw new Error("supervisor must belong to supervisors");
    })),

    body("children")
        .isArray()
        .withMessage("Must be valid"),

    body("children.*")
        .isInt()
        .withMessage("childId should be valid")
        .notEmpty()
        .withMessage('childId must belong to childs')
        .custom(asyncHandeller(async (val) => {
            const child = await childSchema.findOne({ id: val });
            if (!child) throw new Error("childId must belong to children");
        })),


];
exports.updateValidator = [

    body("name")
        .optional()
        .isAlpha()
        .withMessage(" full Name should be string")
        .isLength({ min: 5 })
        .withMessage("  full Name lenght>5"),

    body("supervisor")
        .isMongoId()
        .withMessage(" supervisor must be mongoId ")
        .optional()
        .custom(asyncHandeller(async (val) =>{
            const object = await teacherSchema.findOne({ _id: val });
            if (!object) throw new Error("supervisor must belong to supervisors");
        })),

    body("children")
        .isArray()
        .optional()
        .withMessage("Must be valid"),
        
    body("children.*")
        .isInt()
        .optional()
        .withMessage("id should be valid")
        .custom(asyncHandeller(async (val) => {
            const child = await childSchema.findOne({ _id: val });
            if (!child) throw new Error("childId must belong to children");
        })),
];
exports.deleteValidator = [
    param('id')
        .isInt()
        .withMessage('ID must be an integer')
];
