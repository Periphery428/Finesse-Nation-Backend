const path = require('path');
const express = require('express');
const router = express.Router();

const foodController = require('../controllers/food');
router.get('/helloworld', foodController.helloWorld)
router.post('/getPlaces', foodController.getPlaces);

module.exports = router;
