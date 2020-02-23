let MongoClient = require("mongodb").MongoClient;
// let mongoUrl = "mongodb://localhost:27017/free_food";
let mongoUrl = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@mongoclustercs428-pijzh.mongodb.net/free_food?retryWrites=true&w=majority";

MongoClient.connect(mongoUrl, function(err, client) {
    if(!err) {
        console.log("We are connected to mongodb atlas...");
    }
});

const mongoOptions = {
    connectTimeoutMS: 5000
};

exports.helloWorld = (req, res, next) => {
    res.send("hello there, its working...");
};

exports.testMongoConnection = (req, res, next) => {
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

exports.getEvents = (req, res, next) => {
    MongoClient.connect(mongoUrl, mongoOptions, function (err, client) {
        let db = client.db("free_food");
        db.collection("events").find().toArray(function(err, arr) {
            if(err) {
                res.send({"Error": "adding getting events"});
                res.status(400).end();
            } else {
                res.json(arr);
                client.close();
            }
        });
    });
};

exports.addEvent = (req, res, next) => {
    MongoClient.connect(mongoUrl, mongoOptions, function (err, client) {
        let db = client.db("free_food");
        let newEvent = {
            "name": req.body.name,
            "description": req.body.description,
            "location": req.body.location,
            "duration": req.body.duration
        };
        db.collection("events").insertOne(newEvent, function(err, result) {
            if(err) {
                res.send({"Error": "adding new event = " + req.body.name});
                res.status(400).end();
            } else {
                console.log("Success: added new event = " + req.body.name);
                res.send(result[0]);
            }
            client.close();
        });
    });
};

exports.updateEvent = (req, res, next) => {
    MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {
        let db = client.db("free_food");
        let query = {name: req.body.currentName};
        let updateVals = {
            $set:{
                name: req.body.name,
                description: req.body.description,
                location: req.body.location,
                duration: req.body.duration
            }
        };
        db.collection("events").updateOne(query, updateVals, function(err, result) {
            if(err) {
                console.log("Error: failed to update event = " + req.body.currentName);
                res.status(400).end();
            } else {
                if(result.matchedCount >= 1) {
                    console.log("Success: updated event = " + req.body.name);
                    res.send(result[0]);
                } else {
                    console.log("Error: unable to find event to update = " + req.body.currentName);
                    res.status(400).end();
                }
            }
            client.close();
        });
    });
};

exports.deleteEvent = (req, res, next) => {
    MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {
        let db = client.db("free_food");
        let query = {name: req.body.name};
        db.collection("events").deleteOne(query, function(err, result) {
            if(err) {
                res.send({"Error": "deleting event = " + req.body.name});
                res.status(400).end();
            } else {
                console.log("Success: deleted event = " + req.body.name);
                res.send(result[0]);
            }
            client.close();
        });
    });
};
