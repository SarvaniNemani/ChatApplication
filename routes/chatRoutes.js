var express = require('express');
var router = express.Router();
var chatController = require('../controllers/chatController')
var helper =require('../helpers/helper')

const { uploadAttachment } = require('../helpers/upload')

// Create application 
router.post('',helper.authorize, uploadAttachment.single('file'),chatController.sendMessage);

//get chat
router.get (
    `/chat/:to_id`,
    helper.authorize,
    chatController.getChat,
)

// read chat
router.put(
    `/:id`,
    helper.authorize,
    chatController.readMessage
);

//get notifications
router.get (
    `/notifications/:to_id`,
    helper.authorize,
    chatController.getNotifications,
)

// read notification
router.put(
    `/:id`,
    helper.authorize,
    chatController.readNotification
);

module.exports = router;
