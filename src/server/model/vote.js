const mongoose = require("mongoose"),

    VoteSchema = mongoose.Schema({
        "eventId": {
            "type": String,
            // "required": true
            required: 'Please enter correct event id.',
            trim: true
        },
        "emailId": {
            "type": String,
            // "required": true
            // unique:true,
            required: 'Please enter the email id',
            trim: true,
            // index: true
            // lowercase:true,
            // validate: [{ validator: value => isEmail(value), msg: 'Invalid email.' }]
        },
        "vote": {
            "type": Number,
            "required": true
        }
    });

// Export model comment with CommentSchema
module.exports = mongoose.model("finesse_nation_votes", VoteSchema);


