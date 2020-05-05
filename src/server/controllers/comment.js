const {body, validationResult} = require("express-validator");
const Comment = require("../model/comment");

exports.getComments = function(req, res) {
    //event id is accepted as a path param
    let eventId = req.params.eventId;

    Comment.find({"eventId": eventId}).exec(function(err, listComments) {
        if(err) {  res.status(400).end(); }
        res.json(listComments);
    });
};

exports.addComment = [
    // Validate fields
    body("eventId", "Please enter a valid event id").isLength({min: 1}).trim(),
    body("emailId", "Please enter a valid email address").isLength({min: 1}).trim(),
    body("comment", "The comment cannot be empty").isLength({min: 1}).trim(),
    body("postedTime", "The time cannot be empty").isLength({min: 1}).trim(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Error Happened");
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {eventId, emailId, comment, postedTime} = req.body;
        let newComment = new Comment({
            "eventId": eventId,
            "emailId": emailId,
            "comment": comment,
            "postedTime":postedTime
        });
        await newComment.save(function(err) {
            if(err) { return next(err); }
            let logMessage = "Success: added new comment = " + comment;
            console.log(logMessage);
            res.send(logMessage);
        });
    }
];