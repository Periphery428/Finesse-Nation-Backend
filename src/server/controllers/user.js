const {body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const User = require("../model/user");
const PasswordReset = require("../model/passwordReset");

exports.signup = [
    // Validate fields
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

        const { emailId, password } = req.body;
        const atSplit = emailId.split("@");
        const userName = atSplit[0];
        const dotSplit = atSplit[1].split(".");
        const school = dotSplit[0];
        const points = 0;
        const notifications = true;

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
                school,
                points,
                notifications
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

exports.getCurrentUser = [
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

                res.status(200).json(user);
            } catch (e) {
                console.error(e);
                res.status(500).json({
                    message: "Server Error"
                });
            }
        }
]

exports.changeNotifications = [
    // Validate fields
    body("emailId", "Please enter a valid emailId").isEmail().trim(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {emailId, notifications} = req.body;

        let user = await User.findOne({"emailId": emailId});
        if (user) {
            user.notifications = notifications;
            await user.save(function(err) {
                if(err) {
                    res.send({"Error": "updating notifications for user = " + emailId});
                    res.status(400).end();
                } else {
                    let logMessage = "Success: updated notifications for user = " + emailId;
                    console.log(logMessage);
                    res.status(200).json({
                        message: logMessage
                    });
                }
            });
        } else {
            console.log("Error: unable to find user " + emailId  + " to update notifications");
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
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            const message = {
                from: "xXFinesseNationXx@gmail.com",
                to: emailId,
                subject: "Finesse Nation - Password Reset",
                html: '<p>Click <a href="https://finesse-nation.herokuapp.com/admin/users?email=' + emailId + '&token=' + token + '">here</a> to reset your password</p>'
            };

            transport.sendMail(message, function(err, info) {
                if(err) {
                    console.log(err);
                    res.status(400).json({
                        msg: "Error - unable to send password reset token to user email"
                    });
                }
                else {
                    console.log(info);
                    res.status(200).json({
                        msg: "Password reset token sent to user email",
                        token: token
                    });
                }
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
];
