const express = require("express");
const router = express.Router();

const userController = require('../controllers/user');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/deleteUser', userController.deleteUser);
router.post('/checkEmailExists', userController.checkEmailExists);
router.post('/generatePasswordResetLink', userController.generatePasswordResetLink)
router.post('/checkEmailTokenExists', userController.checkEmailTokenExists);

module.exports = router;

//TODO: FIXES
//1. json web token
//2. email caps and small are treated differently
