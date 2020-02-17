let MongoClient = require("mongodb").MongoClient;
// let mongoUrl = "mongodb://localhost:27017/free_food";
let mongoUrl = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@mongoclustercs428-pijzh.mongodb.net/free_food?retryWrites=true&w=majority";

const mongoOptions = {
    connectTimeoutMS: 5000,
    // useUnifiedTopology:true
};

MongoClient.connect(mongoUrl, mongoOptions, function(err, db) {
    if(!err) {
        console.log("We are connected to mongodb atlas...");
    }
});

exports.helloWorld = (req, res, next) => {
    res.send("hello there, its working...");
};

exports.getPlaces = (req, res, next) => {
    MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {
        if (err) {
            console.log("Error occured in MongoDB: ", err);
        }
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

    // MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {
    //     console.log("[test] beginning of MongoClient.connect()");
    //     if(err) {
    //        console.log("Error occured in MongoDB: ", err);
    //     }
    //     let db = client.db("free_food");
    //     let cursor = db.collection('places').find({"city": req.body.city, "state": req.body.state});
    //     console.log("[test] after cursor defined");
    //     cursor.each(function(err, item) {
    //         if (item != null) {
    //             let buildings = [];
    //             item.buildings.forEach(function(building) {
    //                 buildings.push(building)
    //             });
    //             console.log("[test] buildings = ", buildings);
    //             res.json({"buildings": buildings});
    //         }
    //     });
    //     client.close();
    // });
};
