const {body, validationResult} = require("express-validator");

const Comment = require("../model/comment");

exports.getComments = function(req, res) {

    Comment.find({"eventId": req.body.eventId}).exec(function(err, listComments) {
        if(err) {
            console.log("Error: unable to get events");
            res.status(400).end();
        } else {
            res.json(listComments);
        }
    });
};


//TODO: FIX ISSUE
//'comment`': MongooseError [ValidatorError]: Path `comment`` is required.

exports.addComment = [
    // Validate fields
    body("eventId", "Please enter a valid event title").isLength({min: 1}).trim(),
    // body("description", "Please enter a valid description").isLength({min: 1}).trim(),
    body("emailId", "Please enter a valid location").isLength({min: 1}).trim(),
    // body("duration", "Please enter a valid duration").isLength({min: 1}).trim(),
    body("comment", "Please enter a valid time posted").isLength({min: 1}).trim(),
    // body("image", "Please enter a valid image string binary").isLength({min: 1}).trim(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Error Happened");
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {eventId, emailId, comment} = req.body;

        let newComment = new Comment({
            "eventId": eventId,
            "emailId": emailId,
            "comment": comment
        });

        await newComment.save(function(err) {
            if(err) {
                res.send({"Error": "adding new comment = " + comment});
                console.log(err);
                res.status(400).end();
            } else {
                let logMessage = "Success: added new comment = " + comment;
                console.log(logMessage);
                res.send(logMessage);
            }
        });
    }
];



// await this.findOneAndUpdate(
//     conditions, { $set: data }, { new: true, runValidators: true }
// ).exec()
// return article




// exports.updateComment = [
//     // Validate fields
//     body("eventTitle", "Please enter a valid event title").isLength({min: 1}).trim(),
//     // body("description", "Please enter a valid description").isLength({min: 1}).trim(),
//     body("location", "Please enter a valid location").isLength({min: 1}).trim(),
//     // body("duration", "Please enter a valid duration").isLength({min: 1}).trim(),
//     body("postedTime", "Please enter a valid time posted").isLength({min: 1}).trim(),
//     // body("image", "Please enter a valid image string binary").isLength({min: 1}).trim(),
//
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             console.log("Error Happened");
//             return res.status(400).json({
//                 errors: errors.array()
//             });
//         }
//
//         //TODO: decide on what all fields are modifiable!!!
//         const {eventId, emailId, comment} = req.body;
//
//         //Treating eventTitle as the unique ID
//         let currEvent = await Event.findOne({"eventTitle": eventTitle});
//         if(currEvent) {
//             currEvent.eventTitle = eventTitle;
//             currEvent.emailId = emailId;
//             currEvent.school = school;
//             currEvent.description = description;
//             currEvent.location = location;
//             currEvent.isActive = isActive;
//             currEvent.image = image;
//             currEvent.postedTime = postedTime;
//             currEvent.duration = duration;
//             currEvent.category = category;
//             await currEvent.save(function(err) {
//                 if(err) {
//                     res.send({"Error": "updating event _id = " + eventTitle});
//                     res.status(400).end();
//                 } else {
//                     let logMessage = "Success: updated event _id = " + eventTitle;
//                     console.log(logMessage);
//                     res.send(logMessage);
//                 }
//             });
//         } else {
//             console.log("Error: unable to find event to update _id = " + eventTitle);
//             res.status(400).end();
//         }
//     }
// ];
//
// exports.deleteComment = function(req, res) {
//     let rawEventId = req.body._id;
//     Event.findByIdAndDelete(rawEventId, function(err) {
//         if(err) {
//             res.send({"Error": "deleting comment _id = " + rawEventId});
//             res.status(400).end();
//         } else {
//             let logMessage = "Success: deleted event _id = " + rawEventId;
//             console.log(logMessage);
//             res.send(logMessage);
//         }
//     });
// };
//
