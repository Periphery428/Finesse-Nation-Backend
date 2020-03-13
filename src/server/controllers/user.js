const {body, validationResult, sanitizeBody} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

const apiToken = process.env.API_TOKEN;

exports.signup = [
    // Validate fields
    body("userName", "Please Enter a Valid UserName").isLength({min: 1}).trim(),
    body("emailId", "Please enter a valid emailId").isEmail().trim(),
    body("password", "Please enter a valid password").isLength({min: 6}).trim(),

    // Sanitize fields
    sanitizeBody("*").escape(),

    async (req, res) => {
        if(req.headers.api_token === apiToken) {
            const errors = validationResult(req);
            console.log(":-( " + errors);
            if (!errors.isEmpty()) {
                console.log("Error Happened");
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            const {userName, emailId, password} = req.body;

            try {
                let user = await User.findOne({emailId});
                if (user) {
                    return res.status(400).json({
                        msg: "User Already Exists"
                    });
                }

                user = new User({
                    userName,
                    emailId,
                    password
                    // username,
                    // email,
                    // password
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
        } else {
            console.log("Request is not authorized.");
            return res.status(401).json({
                message: "Request is not authorized."
            });
        }
    }
];

exports.login = [
    // Validate fields
    body("emailId", "Please enter a valid emailId").isEmail().trim(),
    body("password", "Please enter a valid password").isLength({min: 6}).trim(),

    // Sanitize fields
    sanitizeBody("*").escape(),

    async (req, res) => {
        if(req.headers.api_token === apiToken) {
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
                        message: "User Not Exist"
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
        } else {
            console.log("Request is not authorized.");
            return res.status(401).json({
                message: "Request is not authorized."
            });
        }
    }
];

exports.deleteUser = [
    async (req, res) => {
        if(req.headers.api_token === apiToken) {
            const {emailId} = req.body;

            try {
                let user = await User.findOne({emailId});
                if (!user) {
                    return res.status(400).json({
                        message: "User Not Exist"
                    });
                }

                user.remove();

                res.status(200).json({
                    message: "User (" + emailId + ") deleted."
                });
            } catch(e) {
                console.error(e);
                res.status(500).json({
                    message: "Server Error"
                });
            }
        } else {
            console.log("Request is not authorized.");
            return res.status(401).json({
                message: "Request is not authorized."
            });
        }
    }
];
