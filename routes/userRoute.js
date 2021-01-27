var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

// create user
router.post (
    `/user`,
    userController.createUser,
)

module.exports = router;