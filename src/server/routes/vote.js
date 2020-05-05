const express = require('express'),
    router = express.Router();

const voteController = require('../controllers/vote');

/**
 * @swagger
 * /api/vote/eventPoints:
 *    get:
 *      tags:
 *          - Votes
 *      summary: Gets number of upvotes and downvotes for an event.
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
 *          description: Successfully return number of upvotes and downvotes.
 *        400:
 *          description: Fails to return number of upvotes and downvotes.
 */
router.get('/eventPoints', voteController.getVotesByEventId);

/**
 * @swagger
 * /api/vote/userPoints:
 *    get:
 *      tags:
 *          - Votes
 *      summary: Gets number of points (net sum of upvotes and downvotes) for a user.
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
 *          description: Successfully return number of points.
 *        400:
 *          description: Fails to return number of points.
 */
router.get('/userPoints', voteController.getPointsForAUser);

/**
 * @swagger
 * /api/vote/info:
 *    get:
 *      tags:
 *          - Votes
 *      summary: Gets a particular vote (no-vote, upvote, downvote) for a user on an event.
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
 *              emailId:
 *                type: string
 *      responses:
 *        200:
 *          description: Successfully return the vote status.
 *        400:
 *          description: Fails to return the vote status.
 */
router.get('/info', voteController.getVoteByEventAndUser);

/**
 * @swagger
 * /api/food:
 *    post:
 *      tags:
 *          - Votes
 *      summary: Add a new vote from a user on an event.
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
 *              emailId:
 *                type: string
 *              vote:
 *                type: string
 *      responses:
 *        200:
 *          description: Successfully added vote from user on an event.
 *        400:
 *          description: Invalid vote number or input validation failed.
 */
router.post('/', voteController.addVote);

/**
 * @swagger
 * /api/deleteVote:
 *    post:
 *      tags:
 *          - Votes
 *      summary: Delete a vote from a user on an event.
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
 *              emailId:
 *                type: string
 *      responses:
 *        200:
 *          description: Successfully delete a vote from user on an event.
 *        400:
 *          description: Vote from user on event doesn't exist.
 */
router.post("/deleteVote", voteController.deleteVote);

module.exports = router;
