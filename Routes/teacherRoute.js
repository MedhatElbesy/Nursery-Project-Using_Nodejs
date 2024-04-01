const express = require("express");
const router = express.Router();

const controller = require("../Controller/teachersController");
const {insertValidator,updateValidator,deleteValidator,changePasswordValidator} = require("../Midelwares/validation/teacherValidator");
const {uploadTeacherImage,resizeImage,changePass} = require('../Controller/teachersController');
const validatonResult = require("../Midelwares/validation/validationsResault");
const AuthService = require('../Midelwares/validation/authTeacherValidator')

/**
 * @swagger
 * /changepass/{id}:
 *   patch:
 *     summary: Change password
 *     description: Change password for a teacher by ID
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: New password
 *              updatePass:
 *              type:object
 *              description: The updated teacher object.
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
 */

router.route('/changepass/:id')
    .patch(
        AuthService.loginValidator,
        AuthService.protect,
        changePasswordValidator,
        validatonResult,changePass);

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     description: Retrieve a list of all teachers
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: A list of teachers
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
 *   post:
 *     summary: Create a new teacher
 *     description: Create a new teacher record
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *          properties:
 *             fullName:
 * type:
 * string
 * email:
 * type:string
 * format:email
 * password:
 * type:string
 * image:
 * type:file
 * format:binary
 * role:
 * type:string
 * enum:[teacher , admin]
 * required:
 * -fullName
 * -email
 * -password
 * -image-role
 *           
 *     responses:
 *       201:
 *         description: New teacher created successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
 */
router 
    .route("/teachers")
    .get(
        AuthService.loginValidator,
        AuthService.protect,
        controller.getAllTeachers)
    .post(
        AuthService.allowTo('admin'),
        AuthService.protect,
        uploadTeacherImage,
        resizeImage,
        insertValidator,
        validatonResult,
        controller.insertTeacher
        );
    

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Get teacher by ID
 *     description: Retrieve a teacher by its ID
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the teacher
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A teacher object
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
 *   patch:
 *     summary: Update teacher by ID
 *     description: Update a teacher record by its ID
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the teacher
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *   properties:
 *               _id:
 *                 type: string
 *                 format: mongoId
 *                 example: 507f2f77bcf86cd799439011
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               image:
 *                 type: file
 *                 format: binary
 *             required:
 *               - _id
 *            
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
 *   delete:
 *     summary: Delete teacher by ID
 *     description: Delete a teacher record by its ID
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the teacher
 *         schema:
 *           type: object
 * properties:
 *          _id:
 *          typr:string
 *          format: mongoId
 *           example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
 */

router
    .route("/teachers/:id")
    .get( 
        AuthService.loginValidator,
        AuthService.protect,
        controller.getTeacherById)
    .patch(
        AuthService.loginValidator,
        AuthService.protect,
        updateValidator,
        validatonResult,
        controller.updateTeacher)
    .delete(
        AuthService.allowTo('admin'),
        AuthService.protect,
        deleteValidator,
        validatonResult,
        controller.deleteTeacher);

/**
 * @swagger
 * /teachers/supervisors/{id}:
 *   get:
 *     summary: Get all class supervisors for a teacher
 *     description: Retrieve a list of all class supervisors for a teacher by teacher ID
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the teacher
 *         schema:
 *           type: string
 *          format:mongoId
 *             example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: A list of class supervisors
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
 */

router
    .route("/teachers/supervisors/:id")   
    .get(
        AuthService.loginValidator,
        AuthService.protect,
        controller.allClassSupervisors);

module.exports = router;    