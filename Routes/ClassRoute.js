const express = require("express");
const router = express.Router();
const controller = require("../Controller/classController");
const {insertValidator, updateValidator,deleteValidator} = require("../Midelwares/validation/classValidation")
const validatonResult = require("../Midelwares/validation/validationsResault")
const AuthService = require('../Midelwares/validation/authValidator')

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Get all classes
 *     description: Retrieve a list of all classes
 *     responses:
 *       200:
 *         description: A list of classes
 *   post:
 *     summary: Create a new class
 *     description: Create a new class if the user is an admin
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Successfully created a class
 */

router
    .route("/class")
    .get(
        AuthService.loginValidator,
        AuthService.protect,
        controller.getAllClasses)
    .post(
        AuthService.allowTo('admin'),
        AuthService.protect,
        insertValidator,
        validatonResult,
        controller.insertClass);

/**
 * @swagger
 * /class/{id}:
 *   get:
 *     summary: Get class by ID
 *     description: Retrieve a class by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A class object
 *   patch:
 *     summary: Update class by ID
 *     description: Update a class by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Successfully updated class
 *   delete:
 *     summary: Delete class by ID
 *     description: Delete a class by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted class
 */

router
    .route("/class/:id")
    .get(
        AuthService.loginValidator,
        AuthService.protect,
        controller.getClassById)
    .patch(
        AuthService.allowTo('admin'),
        AuthService.protect,
        updateValidator,
        validatonResult,
        controller.updateClass)
    .delete(
        AuthService.allowTo('admin'),
        AuthService.protect,
        deleteValidator,
        validatonResult,
        controller.deleteClass);  
    
/**
 * @swagger
 * /class/teacher/{id}:
 *   get:
 *     summary: Get class supervisor information
 *     description: Retrieve information about the supervisor of a specific class
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class supervisor information
 */

router
    .route("/class/teacher/:id")   
    .get(
        AuthService.loginValidator,
        AuthService.protect,
        controller.classSupervisorInfo);

/**
 * @swagger
 * /class/child/{id}:
 *   get:
 *     summary: Get information about children in a class
 *     description: Retrieve information about children in a specific class
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Information about children in the class
 */

router
    .route("/class/child/:id")    
    .get(
        AuthService.loginValidator,
        AuthService.protect,
        controller.classChildrenInfo);
    
module.exports = router;    

