const express = require('express'),
    router = express.Router();

const voteController = require('../controllers/vote');

router.get('/eventPoints', voteController.getVotesByEventId);
router.get('/userPoints', voteController.getPointsForAUser);
router.get('/info', voteController.getVoteByEventAndUser);
router.post('/', voteController.addVote);
router.post("/deleteVote", voteController.deleteVote);

module.exports = router;
