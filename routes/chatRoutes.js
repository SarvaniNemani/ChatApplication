var express = require('express');
var router = express.Router();
var chatController = require('../controllers/chatController')
var helper =require('../helpers/helper')
// Create application 
router.post('',helper.authorize,chatController.sendMessage);

module.exports = router;
