let MongoClient = require("mongodb").MongoClient;
// let mongoUrl = "mongodb://localhost:27017/free_food";
let mongoUrl = "mongodb+srv://mongoclustercs428-pijzh.mongodb.net/free_food";

exports.helloWorld = (req, res, next) => {
    res.send("hello there, its working...");
};

exports.getPlaces = (req, res, next) => {
    MongoClient.connect(mongoUrl, function(err, client) {
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
