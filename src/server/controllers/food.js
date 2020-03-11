let MongoClient = require("mongodb").MongoClient;
let MongoObjectId = require("mongodb").ObjectID;
// let mongoUrl = "mongodb://localhost:27017/free_food";
let mongoUrl = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@mongoclustercs428-pijzh.mongodb.net/free_food?retryWrites=true&w=majority";
let apiToken = process.env.API_TOKEN

MongoClient.connect(mongoUrl, function(err) {
    if(!err) {
        console.log("We are connected to mongodb atlas...");
    }
});

const mongoOptions = {
    connectTimeoutMS: 5000
};

exports.helloWorld = (req, res) => {
    res.send("hello there, its working...");
};

exports.testMongoConnection = (req, res) => {
    MongoClient.connect(mongoUrl, function(err, client) {
        if(err) {
            console.log("Failed to connect to mongodb atlas...");
            res.status(400).end();
        } else {
            console.log("We are connected to mongodb atlas...");
            res.send("Connected to mongodb atlas.");
        }
        client.close();
    });
};

exports.getEvents = (req, res) => {
    MongoClient.connect(mongoUrl, mongoOptions, function (err, client) {
        let db = client.db("free_food");
        db.collection("events").find().toArray(function(err, arr) {
            if(req.headers.api_token === apiToken) {
                if(err) {
                    console.log("Error: unable to get events");
                    res.status(400).end();
                } else {
                    res.json(arr);
                }
            } else {
                console.log("Request is not authorized.");
                res.status(401).end();
            }
            client.close();
        });
    });
};

exports.addEvent = (req, res) => {
    MongoClient.connect(mongoUrl, mongoOptions, function (err, client) {
        let db = client.db("free_food");
        let newEvent = {
            "name": req.body.name,
            "description": req.body.description,
            "location": req.body.location,
            "duration": req.body.duration,
            "timePosted": req.body.timePosted,
            "image": req.body.image
        };
        db.collection("events").insertOne(newEvent, function(err, result) {
            if(req.headers.api_token === apiToken) {
                if(err) {
                    res.send({"Error": "adding new event = " + req.body.name});
                    res.status(400).end();
                } else {
                    console.log("Success: added new event = " + req.body.name);
                    res.send(result[0]);
                }
            } else {
                console.log("Request is not authorized.");
                res.status(401).end();
            }
            client.close();
        });
    });
};

exports.updateEvent = (req, res) => {
    MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {
        let db = client.db("free_food");
        let eventId = new MongoObjectId(req.body.eventId);
        let query = {_id: eventId};
        let updateVals = {
            $set:{
                name: req.body.name,
                description: req.body.description,
                location: req.body.location,
                duration: req.body.duration
            }
        };
        db.collection("events").updateOne(query, updateVals, function(err, result) {
            if(req.headers.api_token === apiToken) {
                if(err) {
                    console.log("Error: failed to update event _id = " + req.body.eventId);
                    res.status(400).end();
                } else {
                    if(result.matchedCount >= 1) {
                        console.log("Success: updated event _id = " + req.body.eventId);
                        res.send(result[0]);
                    } else {
                        console.log("Error: unable to find event to update _id = " + req.body.eventId);
                        res.status(400).end();
                    }
                }
            } else {
                console.log("Request is not authorized.");
                res.status(401).end();
            }
            client.close();
        });
    });
};

exports.deleteEvent = (req, res) => {
    MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {
        let db = client.db("free_food");
        let eventId = new MongoObjectId(req.body.eventId);
        let query = {_id: eventId};
        db.collection("events").deleteOne(query, function(err, result) {
            if(req.headers.api_token === apiToken) {
                if(err) {
                    res.send({"Error": "deleting event _id = " + req.body.eventId});
                    res.status(400).end();
                } else {
                    console.log("Success: deleted event _id = " + req.body.eventId);
                    res.send(result[0]);
                }
            } else {
                console.log("Request is not authorized.");
                res.status(401).end();
            }
            client.close();
        });
    });
};
