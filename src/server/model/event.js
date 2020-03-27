const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: false
    },
    timePosted: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    active: {
        type: bool,
        required: false
    }
});

// export model user with UserSchema
module.exports = mongoose.model("events", EventSchema);
