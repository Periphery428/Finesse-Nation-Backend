const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    emailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: false
    },
    userName: {
        type: String,
        required: false
    },
    points: {
        type: Number,
        default: 0
    }
});

// export model user with UserSchema
module.exports = mongoose.model("finesse_nation_users", UserSchema);
