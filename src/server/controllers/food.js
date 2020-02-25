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
        if(!err) {
            console.log("We are connected to mongodb atlas...");
            res.send("Connected to mongodb atlas.");
        } else {
            console.log("Failed to connect to mongodb atlas...");
        }
        client.close();
    });
};

exports.getPlaces = (req, res, next) => {
    MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {
        let db = client.db("free_food");
        let cursor = db.collection('places').find({"city": req.body.city, "state": req.body.state});
        cursor.each(function(err, item) {
            if (item != null) {
                let buildings = [];
                item.buildings.forEach(function(building) {
                    buildings.push(building)
                });
                res.json({"buildings": buildings});
            }
        });
        client.close();
    });
};

exports.getEvents = (req, res, next) => {
    MongoClient.connect(mongoUrl, mongoOptions, function (err, client) {
        let db = client.db("free_food");
        db.collection("temp_events").find().toArray(function(err, arr) {
            res.json(arr);
            client.close();
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
        db.collection("temp_events").insertOne(newEvent, function(err, result) {
            if(err) {
                res.send({"Error": "adding new event = " + req.body.name});
            } else {
                console.log("Success: added new event = " + req.body.name);
                res.send(result[0]);
            }
            client.close();
        });
    });
};
