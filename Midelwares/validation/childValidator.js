const { body, param, query } = require("express-validator");

exports.insertValidator = [
    body("id")
        .isInt()
        .withMessage(" id should be  int"),

    body("fullName")
        .isAlpha()
        .withMessage(" full Name should be string")
        .isLength({ min: 5 })
        .withMessage("  full Name lenght>5"),

    body("age")
        .isInt()
        .withMessage(" Age must be Integer"),

    body("level")
        .isIn(["KG","KG1","KG2"])
        .withMessage("Level Must be in (KG,KG1,KG2)"),

        body("address.street")
        .notEmpty()
        .withMessage("Enter value of street"),
        
    body("address.city")
        .notEmpty()
        .withMessage("Enter value of city"),

    body("address.building")
        .notEmpty()
        .withMessage("Enter value of builiding")
];
exports.updateValidator = [

    body("fullName")
        .optional()
        .isAlpha()
        .withMessage("student full Name should be string")
        .isLength({ min: 5 })
        .withMessage(" student full Name lenght larger than 5"),

    body("age")
        .isInt()
        .optional()
        .withMessage(" Age must be Integer"),

    body("level")
        .isIn(["KG","KG1","KG2"])
        .optional()
        .withMessage("Level Must be in (KG,KG1,KG2)"),

    body("address.street")
        .notEmpty()
        .optional()
        .withMessage("Enter value of street"),

    body("address.building")
        .notEmpty()
        .optional()
        .withMessage("Enter value of builiding")
    ];
    
exports.deleteValidator = [
    param('id').isInt().withMessage('ID must be an integer'),
    ];
