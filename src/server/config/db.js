const mongoose = require("mongoose");

// const MONGOURI = "mongodb+srv://cs428User:cs428Pass@mongoclustercs428-pijzh.mongodb.net/free_food?retryWrites=true&w=majority";
const MONGOURI = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@mongoclustercs428-pijzh.mongodb.net/free_food?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
    try {
        // await mongoose.connect(MONGOURI, {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true
        });
        console.log("Connected to DB !!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;

