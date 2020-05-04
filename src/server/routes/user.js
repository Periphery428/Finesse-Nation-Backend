const express = require("express");
const router = express.Router();

const userController = require('../controllers/user');

/**
 * @swagger
 * /api/user/signup:
 *    post:
 *      tags:
 *          - Users
 *      summary: Sign-up a new user.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              emailId:
 *                type: string
 *              password:
 *                type: string
 *      responses:
 *        200:
 *          description: Successfully updated event.
 *        400:
 *          description: Error on adding new user, user already exists, or input validation failed.
 */
router.post('/signup', userController.signup);

/**
 * @swagger
 * /api/user/login:
 *    post:
 *      tags:
 *          - Users
 *      summary: Login as user.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              emailId:
 *                type: string
 *              password:
 *                type: string
 *      responses:
 *        200:
 *          description: Successfully authorize user.
 *        400:
 *          description: Error if user doesn't exist, incorrect password, or input validation failed.
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/user/changeNotifications:
 *    post:
 *      tags:
 *          - Users
 *      summary: Toggle notification boolean option for a user.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              emailId:
 *                type: string
 *              notifications:
 *                type: boolean
 *      responses:
 *        200:
 *          description: Successfully updated notification option for user.
 *        400:
 *          description: Error if user doesn't exist or input validation failed.
 */
router.post('/changeNotifications', userController.changeNotifications);

/**
 * @swagger
 * /api/user/deleteUser:
 *    post:
 *      tags:
 *          - Users
 *      summary: Delete user.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              emailId:
 *                type: string
 *      responses:
 *        200:
 *          description: Successfully deleted user.
 *        400:
 *          description: User doesn't exist.
 */
router.post('/deleteUser', userController.deleteUser);

/**
 * @swagger
 * /api/user/getCurrentUser:
 *    post:
 *      tags:
 *          - Users
 *      summary: Returns existing user.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              emailId:
 *                type: string
 *      responses:
 *        200:
 *          description: Successfully found user to return.
 *        400:
 *          description: User doesn't exist.
 */
router.post('/getCurrentUser', userController.getCurrentUser);

/**
 * @swagger
 * /api/user/checkEmailExists:
 *    post:
 *      tags:
 *          - Users
 *      summary: Check if email is from an existing user.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              emailId:
 *                type: string
 *      responses:
 *        200:
 *          description: Successfully found user from email.
 *        400:
 *          description: User doesn't exist.
 */
router.post('/checkEmailExists', userController.checkEmailExists);

/**
 * @swagger
 * /api/user/generatePasswordResetLink:
 *    post:
 *      tags:
 *          - Users
 *      summary: Generate password reset link for user who requested to reset password.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              emailId:
 *                type: string
 *      responses:
 *        200:
 *          description: Successfully sent email to user with password reset link.
 *        400:
 *          description: Failed to send email or failed validation check.
 */
router.post('/generatePasswordResetLink', userController.generatePasswordResetLink);

module.exports = router;
