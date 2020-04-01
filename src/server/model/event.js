const mongoose = require("mongoose"),

    EventSchema = mongoose.Schema({

        "eventTitle": {
            "type": String,
            "required": true
        },
        "emailId": {
            "type": String,
            "required": true
        },
        "school": {
            "type": String,
            "required": true
        },
        "description": {
            "type": String,
            "required": false
        },
        "location": {
            "type": String,
            "required": true
        },
        "isActive": {
            "type": Boolean,
            "required": false
        },
        "image": {
            "type": String,
            "required": false
        },
        "postedTime": {
            "type": String,
            "required": true
        },
        "duration": {
            "type": String,
            "required": false
        },
        "category": {
            "type": String,
            "required": false
        }
    });

// Export model event with EventSchema
module.exports = mongoose.model("finesse_nation_events", EventSchema);
