var express = require('express');
var router = express.Router();
var chatController = require('../controllers/chatController')
var helper =require('../helpers/helper')

// Send message
router.post(
    '',
    helper.authorize,
    chatController.sendMessage
);

//get chat
router.get (
    `/:to_id`,
    helper.authorize,
    chatController.getChat,
)

// read chat
router.put(
    ``,
    helper.authorize,
    chatController.readMessage
);

//get notifications
router.get (
    `/:to_id`,
    helper.authorize,
    chatController.getNotifications,
)

// read notification
router.put(
    ``,
    helper.authorize,
    chatController.readNotification
);

module.exports = router;
