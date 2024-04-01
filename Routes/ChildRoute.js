const express = require("express");
const router = express.Router();
const controller = require("../Controller/childController");
const {insertValidator,updateValidator,deleteValidator} = require("../Midelwares/validation/childValidator");
const {uploadChildImage,resizeImage} = require('../Controller/childController')
const validatonResult = require("../Midelwares/validation/validationsResault")
const AuthService = require('../Midelwares/validation/authTeacherValidator')

/**
 * @swagger
 * /child:
 *   get:
 *     summary: Get all children
 *     description: Retrieve a list of all children
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: A list of children
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
 *   post:
 *     summary: Create a new child
 *     description: Create a new child record
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *  properties:
 *               fullName:
 *                 type: string
 *                 description:  full name of the child.
 *               age:
 *                 type: number
 *                 description:  age of the child.
 *               level:
 *                 type: string
 *                 enum: [ PreKG , KG1 , KG2 ]
 *                 description:  level of the child.
 *               address[city]:
 *                 type: string
 *               address[street]:
 *                 type: string
 *               address[building]:
 *                 type: string
 *               image:
 *                 type: file
 *                 format: binary
 *                 description:  image of the child.
 *             
 *     responses:
 *       201:
 *         description: New child created successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
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
 *     security:
 *       - jwt: []
 *  
 *     responses:
 *       200:
 *         description: A child object
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
 *   patch:
 *     summary: Update child by ID
 *     description: Update a child record by its ID
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the child
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: The ID of the child to update.
 *               fullName:
 *                 type: string
 *                 description:  full name of the child.
 *               age:
 *                 type: number
 *                 description:  age of the child.
 *               level:
 *                 type: string
 *                 enum: [ PreKG , KG1 , KG2 ]
 *                 description:  level of the child.
 *               address[city]:
 *                 type: string
 *               address[street]:
 *                 type: string
 *               address[building]:
 *                 type: string
 *               image:
 *                 type: file
 *                 format: binary
 *                 description:  image of the child.
 *     responses:
 *       200:
 *         description: Child updated successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
 *   delete:
 *     summary: Delete child by ID
 *     description: Delete a child record by its ID
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the child
 *         schema:
 *           type: string
 * properties:
 * _id:
 * type:int
 *          example: 2
 *     responses:
 *       200:
 *         description: Child deleted successfully
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User does not have permission
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