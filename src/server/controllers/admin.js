const {body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../model/user");
const PasswordReset = require("../model/passwordReset");

exports.changePassword = [
    // Validate fields
    body("emailId", "Please enter a valid emailId").isEmail().trim(),
    body("password", "Please enter a valid password").isLength({min: 6}).trim(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {emailId, password} = req.body;

        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt);

        let user = await User.findOne({"emailId": emailId});
        if (user) {
            user.password = newPassword;
            await user.save(function(err) {
                if(err) {
                    res.send({"Error": "updating password for user = " + emailId});
                    res.status(400).end();
                } else {
                    let logMessage = "Success: updated password for user = " + emailId;
                    console.log(logMessage);
                    res.status(200).json({
                        message: logMessage
                    });
                }
            });
        } else {
            console.log("Error: unable to find user " + emailId  + " to update password");
            res.status(400).end();
        }
    }
];

exports.checkEmailTokenExists = [
    // Validate fields
    body("emailId", "Please enter a valid emailId").isEmail().trim(),
    body("token", "Please enter a valid token").isLength({min: 64}).trim(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {emailId, token} = req.body;
        try {
            let passwordReset = await PasswordReset.findOne({"emailId":emailId, "token":token});
            if(!passwordReset) {
                console.log("Invalid email/token");
                return res.status(401).json({
                    msg: "Invalid email/token"
                });
            }

            let tokenTTLMins = 20;
            if ((Date.now() - passwordReset.creationTime) > tokenTTLMins * 60 * 1000) {
                console.log("Token has expired");
                return res.status(401).json({
                    msg: "Token has expired"
                });
            }

            await passwordReset.remove();

            console.log("Found valid email/token");
            return res.status(200).json({
                msg: "Found valid email/token"
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({
                msg: "Server Error"
            });
        }
    }
];
