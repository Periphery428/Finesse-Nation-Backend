const {body, validationResult} = require("express-validator");

const Event = require("../model/event");

exports.getEvents = function(req, res) {
    Event.find({}).exec(function(err, listEvents) {
        if(err) {
            console.log("Error: unable to get events");
            res.status(400).end();
        } else {
            res.json(listEvents);
        }
    });
};

exports.addEvent = [
    // Validate fields
    body("name", "Please enter a valid name").isLength({min: 1}).trim(),
    // body("description", "Please enter a valid description").isLength({min: 1}).trim(),
    body("location", "Please enter a valid location").isLength({min: 1}).trim(),
    // body("duration", "Please enter a valid duration").isLength({min: 1}).trim(),
    body("timePosted", "Please enter a valid time posted").isLength({min: 1}).trim(),
    // body("image", "Please enter a valid image string binary").isLength({min: 1}).trim(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Error Happened");
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {name, description, location, duration, timePosted, image} = req.body;

        let newEvent = new Event({
            "name": name,
            "description": description,
            "location": location,
            "duration": duration,
            "timePosted": timePosted,
            "image": image
        });

        await newEvent.save(function(err) {
            if(err) {
                res.send({"Error": "adding new event = " + name});
                res.status(400).end();
            } else {
                let logMessage = "Success: added new event = " + name;
                console.log(logMessage);
                res.send(logMessage);
            }
        });
    }
];

exports.updateEvent = [
    // Validate fields
    body("name", "Please enter a valid name").isLength({min: 1}).trim(),
    // body("description", "Please enter a valid description").isLength({min: 1}).trim(),
    body("location", "Please enter a valid location").isLength({min: 1}).trim(),
    // body("duration", "Please enter a valid duration").isLength({min: 1}).trim(),
    body("timePosted", "Please enter a valid time posted").isLength({min: 1}).trim(),
    // body("image", "Please enter a valid image string binary").isLength({min: 1}).trim(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Error Happened");
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {eventId, name, description, location, duration, timePosted, image} = req.body;

        let currEvent = await Event.findOne({"_id": eventId});
        if(currEvent) {
            currEvent.name = name;
            currEvent.description = description;
            currEvent.location = location;
            currEvent.duration = duration;
            currEvent.timePosted = timePosted;
            currEvent.image = image;
            await currEvent.save(function(err) {
                if(err) {
                    res.send({"Error": "updating event _id = " + eventId});
                    res.status(400).end();
                } else {
                    let logMessage = "Success: updated event _id = " + eventId;
                    console.log(logMessage);
                    res.send(logMessage);
                }
            });
        } else {
            console.log("Error: unable to find event to update _id = " + eventId);
            res.status(400).end();
        }
    }
];

exports.deleteEvent = function(req, res) {
    let rawEventId = req.body.eventId;
    Event.findByIdAndDelete(rawEventId, function(err) {
        if(err) {
            res.send({"Error": "deleting event _id = " + rawEventId});
            res.status(400).end();
        } else {
            let logMessage = "Success: deleted event _id = " + rawEventId;
            console.log(logMessage);
            res.send(logMessage);
        }
    });
};

