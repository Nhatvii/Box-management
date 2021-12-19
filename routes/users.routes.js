const userController = require("../controllers/users.controller");

const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *                  description: The username
 *                  example: nhatvii
 *              password:
 *                  type: string
 *                  description: The password
 *                  example: 123456
 *              email:
 *                  type: string
 *                  description: The email
 *                  example: abc@gmail.com
 *              address:
 *                  type: string
 *                  description: The address
 *                  example: 123 abc q8
 *              phone:
 *                  type: number
 *                  description: The phone
 *                  example: 9876767671
 */
 
/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Access to Users API
 */

/**
 * @swagger
 * /users/login:
 *  post:
 *      summary: login method
 *      tags: [Users]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: the user is login
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: server error
 */
router.post("/login", userController.login);
/**
 * @swagger
 * /users/register:
 *  post:
 *      summary: Register method
 *      tags: [Users]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: register success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: server error
 */
router.post("/register", userController.register);
/**
 * @swagger
 * /users:
 *   get:
 *      summary: Return the list of the user  
 *      tags: [Users]
 *      responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *        description: Invalid username supplied
 *       '404':
 *         description: User not found
 */
router.get("/", userController.getUser);


router.get("/user-profile", userController.userProfile);

module.exports = router;