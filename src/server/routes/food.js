const path = require('path');
const express = require('express');
const router = express.Router();

const foodController = require('../controllers/food');
router.get('/helloworld', foodController.helloWorld);
router.get('/testMongoConnection', foodController.testMongoConnection);
router.get('/getEvents', foodController.getEvents);
router.post('/addEvent', foodController.addEvent);
router.post('/updateEvent', foodController.updateEvent);
router.post('/deleteEvent', foodController.deleteEvent);

module.exports = router;
