const express = require('express'),
    router = express.Router();

const commentController = require('../controllers/comment');

router.get('/:eventId', commentController.getComments);
router.post('/', commentController.addComment);
// router.put('/comment', eventController.updateComment);
// router.delete('/comment', eventController.deleteComment);

module.exports = router;
