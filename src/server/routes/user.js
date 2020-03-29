const express = require("express");
const router = express.Router();

const userController = require('../controllers/user');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/changePassword', userController.changePassword);
router.post('/deleteUser', userController.deleteUser);
router.post('/checkEmailExists', userController.checkEmailExists);
router.post('/generatePasswordResetLink', userController.generatePasswordResetLink)
router.post('/checkEmailTokenExists', userController.checkEmailTokenExists);


module.exports = router;
