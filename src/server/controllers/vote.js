const {body, validationResult} = require("express-validator");

const Vote = require("../model/vote");
// const http = require('http');
// const url = require('url');

//it return the number of user who have voted this post.
exports.getVotesByEventId = function(req, res) {

    // const queryObject = url.parse(req.url,true).query;
    // console.log(queryObject);

    //event id is accepted as a query param
    var eventId = req.query.eventId;

    Vote.find({"eventId": eventId}).exec(function(err, listVotes) {
        if(err) {
            console.log("Error: unable to get events");
            res.status(400).end();
        } else {

            var upVote = 0;
            var downVote = 0;

            for (var i  in listVotes){
                // console.log(listVotes[i]);
                if(listVotes[i].vote == 1)
                    upVote++;
                else if(listVotes[i].vote == -1) //Condition not required
                    downVote++;
            }
            res.json({"upVote": upVote, "downVote":downVote});
        }
    });
};

//Points of a user = No. of times he has upvoted or downvoted a post.
exports.getPointsForAUser = function(req, res) {

    //event id is accepted as a path param
    var emailId = req.query.emailId;

    // Comment.find({"eventId": req.body.eventId}).exec(function(err, listComments) {
    Vote.find({"emailId": emailId}).exec(function(err, listVotes) {
        if(err) {
            console.log("Error: unable to get events");
            res.status(400).end();
        } else {
            res.json({"points":listVotes.length});
        }
    });
};


//Get whether it's an upvote or downvote or No vote.
//Points of a user = No. of times he has upvoted or downvoted a post.
exports.getVoteByEventAndUser = function(req, res) {

    var eventId = req.query.eventId;
    var emailId = req.query.emailId;

    Vote.find({"eventId": eventId, "emailId":emailId}).exec(function(err, singleVote) {
        if(err) {
            console.log("Error: unable to get events");
            res.status(400).end();
        } else {
            //there will always be a single vote
            var response = "";
            if(singleVote.length == 0)
                response = "NOT_VOTED";
            else if(singleVote[0].vote == 1)
                response = "UPVOTE";
            else
                response = "DOWNVOTE";
            res.json({"status":response});
        }
    });
};

exports.addVote = [
    // Validate fields
    body("eventId", "Please enter a valid event id").isLength({min: 1}).trim(),
    // body("description", "Please enter a valid description").isLength({min: 1}).trim(),
    body("emailId", "Please enter a valid email address").isLength({min: 1}).trim(),
    // body("duration", "Please enter a valid duration").isLength({min: 1}).trim(),
    body("vote", "The user must upvote or downvote").isLength({min: 1}).trim(),
    // body("image", "Please enter a valid image string binary").isLength({min: 1}).trim(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Error Happened");
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {eventId, emailId, vote} = req.body;

        //vote value must be +1 or -1.
        if(vote != 1 && vote != -1)
            return res.json({"status":"INVALID_VOTE_NUMBER"});

        let newVote = new Vote({
            "eventId": eventId,
            "emailId": emailId,
            "vote": vote
        });

        //For simplicity, I am deleting and inserting a vote object
        //To avoid the frontend to make two calls.
        //CONS: Two DB Calls are made now.
        //PROS: Avoids a number of additional checks here, Followed this quick fix approach to fix a BUG! => IMPROVISE.
        // let voteElement = await Vote.findOne({"_id": voteId});
        let voteElement = await Vote.findOne({"eventId": eventId, "emailId":emailId});
        console.log("Fetched from Mongo "+voteElement);
        if(voteElement) {
            Vote.findByIdAndDelete(voteElement._id, function (err) {
                if (err) {
                    res.send({"Error": "deleting event _id = " + voteElement._id});
                    res.status(400).end();
                } else {
                    let logMessage = "Success: deleted event _id = " + voteElement._id;
                    console.log(logMessage);
                    // res.send(logMessage);
                }
            });
        }
        //vote element is 0(likely would not happen) or no vote element found
        await newVote.save(function (err) {
                if (err) {
                    res.send({"Error": "adding new vote = " + vote});
                    console.log(err);
                    //Bad Request
                    res.status(400).end();
                } else {
                    res.json({"status": "Successfully Upvoted-Downvoted"});
                }
            });
    }
];