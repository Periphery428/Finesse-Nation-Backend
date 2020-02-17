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
