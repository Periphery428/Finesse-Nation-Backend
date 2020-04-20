const express = require("express");
const router = express.Router();

const userController = require('../controllers/user');

//TODO: NOT all of these should be HTTP POST Requests.
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/changeNotifications', userController.changeNotifications);
router.post('/deleteUser', userController.deleteUser);
router.post('/getCurrentUser', userController.getCurrentUser);
router.post('/checkEmailExists', userController.checkEmailExists);
router.post('/generatePasswordResetLink', userController.generatePasswordResetLink);

module.exports = router;
