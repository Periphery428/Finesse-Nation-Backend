const path = require('path');
const express = require('express');
const router = express.Router();

const foodController = require('../controllers/food');
router.get('/helloworld', foodController.helloWorld);
router.get('/getEvents', foodController.getEvents);
router.post('/getPlaces', foodController.getPlaces);
router.post('/addEvent', foodController.addEvent);

module.exports = router;
