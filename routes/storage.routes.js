const express = require("express");
const router = express.Router();
const storageController = require("../controllers/storage.controller");

/**
 * @swagger
 * components:
 *  schemas:
 *      Storage:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: The id
 *                  example: SE123
 *              address:
 *                  type: string
 *                  description: The address
 *                  example: 123 abc q8
 *              storageName:
 *                  type: string
 *                  description: The storage name
 *                  example: Medium Storage
 *              startCount:
 *                  type: number
 *                  description: The star count
 *                  example: 3
 *              status:
 *                  type: boolean
 *                  description: The status
 *                  example: true
 *              price:
 *                  type: number
 *                  description: The phone
 *                  example: 4000000
 *              description:
 *                  type: string
 *                  description: The description
 *                  example: ac mnk khsm ckladjada
 *              storageSize:
 *                  type: string
 *                  description: The storage size
 *                  example: 50m x 30m x 10m
 *              ownerName:
 *                  type: string
 *                  description: The owner name
 *                  example: Thanh Tuyền
 *              expriredDate:
 *                  type: string
 *                  description: The exprire date
 *                  example: 25/12/2021
 *              month:
 *                  type: number
 *                  description: The month
 *                  example: 1
 */

/**
 * @swagger
 * tags:
 *  name: Storage
 *  description: Access to Storage API
 */
/**
 * @swagger
 * /storage:
 *  get:
 *      summary: Get storage
 *      tags: [Storage]
 *      description: return the list of storage
 *      responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Storage'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/Storage'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: Storage not found
 */
router.get("/", storageController.GetStorage);

/**
 * @swagger
 * /storage/{id}:
 *  get:
 *      summary: Get storage by Id
 *      tags: [Storage]
 *      description: return the list of storage
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Storage'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/Storage'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: Storage not found
 */
 router.get("/:id", storageController.GetStorageById);
/**
 * @swagger
 * /storage:
 *  post:
 *      summary: Create storage
 *      tags: [Storage]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Storage'
 *      responses:
 *          200:
 *              description: create storage method
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Storage'
 *          500:
 *              description: server error
 */
router.post("/", storageController.CreateStorage);

/**
 * @swagger
 * /storage/{id}:
 *  patch:
 *      summary: Update storage
 *      tags: [Storage]
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *      requestBody: 
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Storage'
 *      responses:
 *          200:
 *              description: create storage method
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Storage'
 *          500:
 *              description: server error
 */
router.patch("/:id", storageController.UpdateStorage);
/**
 * @swagger
 * /storage/{id}:
 *  delete:
 *      summary: Delete storage
 *      tags: [Storage]
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *          200:
 *              description: create storage method
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Storage'
 *          500:
 *              description: server error
 */
router.delete("/:id", storageController.DeleteStorage);
module.exports = router;