var express = require('express');
var router = express.Router();
var onlineUserController = require('../controllers/onlineUserController')
var helper =require('../helpers/helper')

//get online users
router.get('',helper.authorize,onlineUserController.getOnlineUsers);

module.exports = router;
