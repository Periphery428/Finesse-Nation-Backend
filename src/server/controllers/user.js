const {body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const User = require("../model/user");
const PasswordReset = require("../model/passwordReset");

exports.signup = [
    // Validate fields
    body("userName", "Please Enter a Valid UserName").isLength({min: 1}).trim(),
    body("emailId", "Please enter a valid emailId").isEmail().trim(),
    body("password", "Please enter a valid password").isLength({min: 6}).trim(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Error Happened");
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {userName, emailId, password, school} = req.body;

        try {
            let user = await User.findOne({emailId});
            if (user) {
                return res.status(400).json({
                    msg: "User already exists"
                });
            }

            user = new User({
                userName,
                emailId,
                password,
                school
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString",
                {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
];

exports.login = [
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
        try {
            let user = await User.findOne({emailId});
            if (!user) {
                return res.status(400).json({
                    message: "User does not exist"
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: "Incorrect Password !"
                });
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString",
                {
                    expiresIn: 3600
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
];

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
                    res.send(logMessage);
                }
            });
        } else {
            console.log("Error: unable to find user " + emailId  + " to update password");
            res.status(400).end();
        }
    }
];

exports.deleteUser = [
    async (req, res) => {
        const {emailId} = req.body;

        try {
            let user = await User.findOne({emailId});
            if (!user) {
                return res.status(400).json({
                    message: "User does not exist"
                });
            }

            await user.remove();

            res.status(200).json({
                message: "User (" + emailId + ") deleted."
            });
        } catch(e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
];

exports.checkEmailExists = [
    // Validate fields
    body("emailId", "Please enter a valid emailId").isEmail().trim(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {emailId} = req.body;
        try {
            let user = await User.findOne({emailId});
            if (!user) {
                return res.status(400).json({
                    message: "User does not exist"
                });
            }

            res.status(200).json({
               msg: "User found"
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
];

exports.generatePasswordResetLink = [
    // Validate fields
    body("emailId", "Please enter a valid emailId").isEmail().trim(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {emailId} = req.body;
        try {
            // Check if user already sent password reset request and refresh new token if exists
            let user = await PasswordReset.findOne({emailId});
            if (user) {
                await user.remove();
            }

            // Add password reset token to db
            let token = crypto.randomBytes(32).toString("hex");
            let creationTime = Date.now();
            let passwordReset = new PasswordReset({
                emailId,
                token,
                creationTime
            });

            await passwordReset.save();

            // Send password reset link to users email
            let transport = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: process.env.MAILTRAP_USERNAME,
                    pass: process.env.MAILTRAP_PASSWORD
                }
            });

            const message = {
                from: "admin@finessenation.com",
                to: emailId,
                subject: "Finesse Nation - Password Reset",
                text: '<p>Click <a href="https://finesse-nation.herokuapp.com:3000/users?email=' + emailId + '&token=' + token + '">here</a> to reset your password</p>'
            };

            transport.sendMail(message, function(err) {
                if(err) {
                    res.status(400).json({
                        msg: "Error - unable to send password reset token to user email"
                    });
                }
                res.status(200).json({
                    msg: "Password reset token sent to user email"
                });
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
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
            let user = await PasswordReset.findOne({"emailId":emailId, "token":token});
            if(!user) {
                return res.status(401).json({
                    msg: "Invalid email/token or token has expired"
                });
            }

            await user.remove();

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
