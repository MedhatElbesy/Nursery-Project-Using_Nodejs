const express = require("express");
const router = express.Router();

const controller = require("../Controller/teachersController");
const {insertValidator,updateValidator,deleteValidator,changePasswordValidator} = require("../Midelwares/validation/teacherValidator");
const {uploadTeacherImage,resizeImage,changePass} = require('../Controller/teachersController');
const validatonResult = require("../Midelwares/validation/validationsResault");
const AuthService = require('../Midelwares/validation/authValidator')

/**
 * @swagger
 * /changepass/{id}:
 *   patch:
 *     summary: Endpoint to change password
 *     description: This endpoint is used to change password
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success message
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
 *     description: This endpoint returns all teachers
 *     responses:
 *       200:
 *         description: List of teachers
 *   post:
 *     summary: Create a new teacher
 *     description: This endpoint creates a new teacher
 *     responses:
 *       200:
 *         description: Success message
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
        controller.insertTeacher);
    

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Get a teacher by ID
 *     description: This endpoint returns a teacher by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher details
 *   patch:
 *     summary: Update a teacher
 *     description: This endpoint updates a teacher
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success message
 *   delete:
 *     summary: Delete a teacher
 *     description: This endpoint deletes a teacher
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success message
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
 *     description: This endpoint returns all class supervisors for a teacher
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of class supervisors
 */


router
    .route("/teachers/supervisors/:id")   
    .get(
        AuthService.loginValidator,
        AuthService.protect,
        controller.allClassSupervisors);

module.exports = router;    