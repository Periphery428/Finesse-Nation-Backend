// Const path = require('path');
const express = require('express'),
    router = express.Router();

const eventController = require('../controllers/event');

router.get('/getEvents', eventController.getEvents);
router.post('/addEvent', eventController.addEvent);
router.put('/updateEvent', eventController.updateEvent);
router.delete('/deleteEvent', eventController.deleteEvent);

module.exports = router;
