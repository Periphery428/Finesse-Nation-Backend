const express = require("express");

//TODO: make use of API token
let apiToken = process.env.API_TOKEN

//express-validator: requires to express-validator/check are deprecated.You should just use require("express-validator") instead.
// const { check, validationResult } = require("express-validator/check");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
// const auth = require("../middleware/auth");

const User = require("../model/user");

const path = require('path');

//TODO: the logic below to be shifted to the controller layer
const userController = require('../controllers/user');

// router.post('/signup', userController.signup);
// module.exports = router;

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.post(
    "/signup",
    [
        check("userName", "Please Enter a Valid UserName")
            .not()
            .isEmpty(),
        check("emailId", "Please enter a valid emailId").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        console.log(":-( "+errors);
        if (!errors.isEmpty()) {
            console.log("Error Happened");
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { userName, emailId, password } = req.body;

        console.log("Fixing Bugs");
        console.log("Username: "+userName);
        console.log("emailId: "+emailId);
        console.log("password: "+password);
        try {
            let user = await User.findOne({
                emailId
            });
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
    }
);

router.post(
    "/login",
    [
        check("emailId", "Please enter a valid emailId").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { emailId, password } = req.body;
        try {
            let user = await User.findOne({
                emailId
            });
            if (!user)
                return res.status(400).json({
                    message: "User Not Exist"
                });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect Password !"
                });

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
);

/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /user/me
 */

// router.get("/me", auth, async (req, res) => {
//     try {
//         // request.user is getting fetched from Middleware after token authentication
//         const user = await User.findById(req.user.id);
//         res.json(user);
//     } catch (e) {
//         res.send({ message: "Error in Fetching user" });
//     }
// });

module.exports = router;


//TODO: FIXES
//1. add api token
//2. json web token
//3. email caps and small are treated differently
//4. Move current implementation to controller class