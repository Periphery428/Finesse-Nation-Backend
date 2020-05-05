const express = require('express'),
    router = express.Router();

const commentController = require('../controllers/comment');

router.get('/:eventId', commentController.getComments);
router.post('/', commentController.addComment);

module.exports = router;
