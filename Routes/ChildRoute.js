const express = require("express");
const router = express.Router();
const controller = require("../Controller/childController");
const {insertValidator,updateValidator,deleteValidator} = require("../Midelwares/validation/childValidator");
const {uploadChildImage,resizeImage} = require('../Controller/childController')
const validatonResult = require("../Midelwares/validation/validationsResault")
const AuthService = require('../Midelwares/validation/authValidator')

/**
 * @swagger
 * /child:
 *   get:
 *     summary: Get all children
 *     description: Retrieve a list of all children
 *     responses:
 *       200:
 *         description: A list of children
 *   post:
 *     summary: Create a new child
 *     description: Create a new child with image upload
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               // Add other fields as required by your schema
 *     responses:
 *       200:
 *         description: Successfully created a child
 */

router
    .route("/child")
    .get(
        AuthService.loginValidator,
        AuthService.protect,
        controller.getAllChild)
    .post(
        AuthService.allowTo('admin'),
        AuthService.protect,
        uploadChildImage,
        resizeImage,
        insertValidator,
        validatonResult,
        controller.insertChild
    );
/**
 * @swagger
 * /child/{id}:
 *   get:
 *     summary: Get child by ID
 *     description: Retrieve a child by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A child object
 *   patch:
 *     summary: Update child by ID
 *     description: Update a child by its ID with image upload
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               // Add other fields as required by your schema
 *     responses:
 *       200:
 *         description: Successfully updated child
 *   delete:
 *     summary: Delete child by ID
 *     description: Delete a child by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted child
 */

router
    .route("/child/:id")
    .get(
        AuthService.loginValidator,
        AuthService.protect,
        controller.getChildById)
    .patch(
        AuthService.allowTo('admin'),
        AuthService.protect,
        uploadChildImage,
        resizeImage,
        updateValidator,
        validatonResult,
        controller.updateChild
    )
    .delete(
        AuthService.allowTo('admin'),
        AuthService.protect,
        deleteValidator,
        validatonResult,
        controller.deleteChild
    );    

module.exports = router;    