const userController = require("../controllers/users.controller");

const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - username
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *                  description: The username
 *                  example: nhatvii
 *              password:
 *                  type: string
 *                  description: The password
 *                  example: 123456
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

router.get("/user-profile", userController.userProfile);

module.exports = router;