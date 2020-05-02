const express = require("express");
const router = express.Router();

const userController = require('../controllers/user');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/changeNotifications', userController.changeNotifications);
router.post('/deleteUser', userController.deleteUser);
router.post('/getCurrentUser', userController.getCurrentUser);
router.post('/checkEmailExists', userController.checkEmailExists);
router.post('/generatePasswordResetLink', userController.generatePasswordResetLink);

module.exports = router;
