const express = require("express");
const router = express.Router();

const adminController = require('../controllers/admin');

router.post('/changePassword', adminController.changePassword);
router.post('/checkEmailTokenExists', adminController.checkEmailTokenExists);

module.exports = router;
