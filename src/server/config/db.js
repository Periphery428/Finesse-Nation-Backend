const mongoose = require("mongoose");

const MONGOURI = "mongodb+srv://" + "cs428User"/*process.env.MONGODB_USERNAME*/ + ":" + "cs428Pass"/*process.env.MONGODB_PASSWORD*/ + "@mongoclustercs428-pijzh.mongodb.net/free_food?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("Connected to DB !!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;

