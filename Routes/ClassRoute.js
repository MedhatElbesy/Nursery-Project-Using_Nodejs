const express = require("express");
const router = express.Router();
const controller = require("../Controller/classController");
const {insertValidator, updateValidator,deleteValidator} = require("../Midelwares/validation/classValidation")
const validatonResult = require("../Midelwares/validation/validationsResault")
const AuthService = require('../Midelwares/validation/authTeacherValidator')

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Get all classes
 *     description: Retrieve a list of all classes
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: A list of classes
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
 *   post:
 *     summary: Create a new class
 *     description: Create a new class
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 * properties:
 *              name:
 *          type:string
 *        description: name of class.
 *          supervisor:
 *          type: string
 *          format: mongoId
 *           example: 507f1f77bcf86cd799439011
 *           children:
 *          type: int
 *          description:array of child
 * 
 *     responses:
 *       201:
 *         description: New class created successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
 */

router
    .route("/class")
    .get(
        AuthService.loginValidator,
        AuthService.protect,
        controller.getAllClasses)
    .post(
        AuthService.allowTo('admin'),
        // AuthService.protect,
        insertValidator,
        validatonResult,
        controller.insertClass);

/**
 * @swagger
 * /class/{id}:
 *   get:
 *     summary: Get class by ID
 *     description: Retrieve a class by its ID
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A class object
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
 *   patch:
 *     summary: Update class by ID
 *     description: Update a class record by its ID
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *          _id
 *          type:int
 *     responses:
 *       200:
 *         description: Class updated successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
 *   delete:
 *     summary: Delete class by ID
 *     description: Delete a class record by its ID
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class
 *         schema:
 *           type: string
 * properties:
 *               _id:
 *                 type: int
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
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
 *     summary: Get class supervisor info
 *     description: Retrieve class supervisor info by teacher ID
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the teacher
 *         schema:
 *           type: string
 * properties:
 *               _id:
 *                 type: string
 *                 format: mongoId
 *                 example: 507f2f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Class supervisor info retrieved successfully
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
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
 *     summary: Get class children info
 *     description: Retrieve class children info by class ID
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class
 *         schema:
 *           type: string
 * properties:
 *               _id:
 *                 type: string                
 *                 example: 1
 *     responses:
 *       200:
 *         description: Class children info retrieved successfully
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
 */
router
    .route("/class/child/:id")    
    .get(
        AuthService.loginValidator,
        AuthService.protect,
        controller.classChildrenInfo);
    
module.exports = router;    

