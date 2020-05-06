const express = require("express");
const router = express.Router();

const eventController = require('../controllers/event');

/**
 * @swagger
 * /api/food/getEvents:
 *    get:
 *      tags:
 *          - Events
 *      summary: Get list of all events.
 *      responses:
 *        200:
 *          description: Successfully return list of events.
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                eventTitle:
 *                  type: string
 *                emailId:
 *                  type: string
 *                school:
 *                  type: string
 *                description:
 *                  type: string
 *                location:
 *                  type: string
 *                image:
 *                  type: string
 *                postedTime:
 *                  type: string
 *                duration:
 *                  type: string
 *                category:
 *                  type: string
 *                __v:
 *                  type: integer
 *              example:
 *                _id: "5e97736e252060001734703b"
 *                eventTitle: "View Info Integration Test Free Food"
 *                emailId: "test@test.com"
 *                school: "test"
 *                description: "View Info description"
 *                location: "Location: 2020-04-15 15:49:49.217353"
 *                image: ""
 *                postedTime: "2020-04-15 15:49:50.131394"
 *                duration: "Mark as Expired Integration Test"
 *                category: "Food"
 *                __v: 1
 *        400:
 *          description: Fails to return list of events.
 */
router.get('/getEvents', eventController.getEvents);

/**
 * @swagger
 * /api/food/addEvent:
 *    post:
 *      tags:
 *          - Events
 *      summary: Add a new event.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              eventTitle:
 *                type: string
 *              emailId:
 *                type: string
 *              school:
 *                type: string
 *              description:
 *                type: string
 *              location:
 *                type: string
 *              isActive:
 *                type: string
 *              image:
 *                type: string
 *              postedTime:
 *                type: string
 *              duration:
 *                type: string
 *              category:
 *                type: string
 *      responses:
 *        200:
 *          description: Successfully added new event.
 *          schema:
 *            type: string
 *            example: "Success: added new event = Test Event 2"
 *        400:
 *          description: Error on adding new event or input validation failed.
 */
router.post('/addEvent', eventController.addEvent);

/**
 * @swagger
 * /api/food/updateEvent:
 *    post:
 *      tags:
 *          - Events
 *      summary: Update an event.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              eventTitle:
 *                type: string
 *              emailId:
 *                type: string
 *              school:
 *                type: string
 *              description:
 *                type: string
 *              location:
 *                type: string
 *              isActive:
 *                type: string
 *              image:
 *                type: string
 *              postedTime:
 *                type: string
 *              duration:
 *                type: string
 *              category:
 *                type: string
 *      responses:
 *        200:
 *          description: Successfully updated event.
 *          schema:
 *            type: string
 *            example: "Success: updated event _id = 2eb1cfe4j9c7c6234632af16"
 *        400:
 *          description: Error on updating event, event non-existing, or input validation failed.
 */
router.post('/updateEvent', eventController.updateEvent);

/**
 * @swagger
 * /api/food/deleteEvent:
 *    post:
 *      tags:
 *          - Events
 *      summary: Delete an event.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              eventId:
 *                type: string
 *      responses:
 *        200:
 *          description: Successfully deleted event.
 *          schema:
 *            type: string
 *            example: "Success: deleted event _id = 2eb1cfe4j9c7c6234632af16"
 *        400:
 *          description: Error on deleting event.
 */
router.post('/deleteEvent', eventController.deleteEvent);

module.exports = router;
