const {body, validationResult} = require("express-validator");

const Event = require("../model/event");

/**
 *
 * @param req
 * @param res
 */
exports.getEvents = function(req, res) {
    Event.find({}).exec(function(err, listEvents) {
        if(err) {  res.status(400).end(); }
        res.json(listEvents);
    });
};

/**
 *
 * @type {(ValidationChain|(function(...[*]=)))[]}
 */
exports.addEvent = [
    // Validate fields
    body("eventTitle", "Please enter a valid event title").isLength({min: 1}).trim(),
    body("location", "Please enter a valid location").isLength({min: 1}).trim(),
    body("postedTime", "Please enter a valid time posted").isLength({min: 1}).trim(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Error Happened");
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {eventTitle, emailId, school, description, location, isActive, image, postedTime, duration, category} = req.body;

        let newEvent = new Event({
            "eventTitle": eventTitle,
            "emailId": emailId,
            "school": school,
            "description": description,
            "location": location,
            "isActive" : isActive,
            "image": image,
            "postedTime": postedTime,
            "duration": duration,
            "category" : category
        });

        await newEvent.save(function(err) {
            if(err) { return next(err); }
            let logMessage = "Success: added new event = " + eventTitle;
            console.log(logMessage);
            res.send(logMessage);
        });
    }
];

/**
 *
 * @type {ValidationChain[]}
 */
exports.updateEvent = [
    // Validate fields
    body("eventId", "Please enter a valid event id").isLength({min: 24}).trim(),
    body("eventTitle", "Please enter a valid event title").isLength({min: 1}).trim(),
    body("location", "Please enter a valid location").isLength({min: 1}).trim(),
    body("postedTime", "Please enter a valid time posted").isLength({min: 1}).trim(),
    body("location", "Please enter a valid location").isLength({min: 1}).trim(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Error Happened");
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {eventId, eventTitle, emailId, school, description, location, isActive, image, postedTime, duration, category} = req.body;

        try {
            //Treating eventTitle as the unique ID
            let currEvent = await Event.findOne({"_id": eventId});
            currEvent.eventTitle = eventTitle;
            currEvent.emailId = emailId;
            currEvent.school = school;
            currEvent.description = description;
            currEvent.location = location;
            currEvent.isActive = isActive;
            currEvent.image = image;
            currEvent.postedTime = postedTime;
            currEvent.duration = duration;
            currEvent.category = category;
            await currEvent.save(function(err) {
                if(err) { return next(err); }
                let logMessage = "Success: updated event _id = " + eventId;
                console.log(logMessage);
                res.send(logMessage);
            });
        } catch(err) {
            console.log("Error: unable to find event to update _id = " + eventId);
            res.status(400).end();
        }
    }
];

/**
 *
 * @param req
 * @param res
 */
exports.deleteEvent = function(req, res) {
    let rawEventId = req.body.eventId;
    Event.findByIdAndDelete(rawEventId, function(err) {
        if(err) {  res.status(400).end(); }
        else {
            let logMessage = "Success: deleted event _id = " + rawEventId;
            console.log(logMessage);
            res.send(logMessage);
        }
    });
};
