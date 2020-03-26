const mongoose = require("mongoose");

const PasswordResetSchema = mongoose.Schema({
    emailId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    creationTime: {
        type: Date
    }
});

// export model user with UserSchema
module.exports = mongoose.model("password_reset", PasswordResetSchema);
