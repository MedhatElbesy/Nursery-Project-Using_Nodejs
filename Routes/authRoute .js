const express = require("express");
const router = express.Router();

const {signupValidator,loginValidator} = require("../Midelwares/validation/authValidator");
const {signup,login} = require('../Controller/signupController');
const validatonResult = require("../Midelwares/validation/validationsResault");

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User signup
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       200:
 *         description: User successfully signed up
 */

router 
    .route("/signup")
    .post(signupValidator,validatonResult,signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Log in with existing credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: User successfully logged in
 *       401:
 *         description: Invalid credentials
 */

router 
    .route("/login")
    .post(loginValidator,validatonResult,login);

module.exports = router;    