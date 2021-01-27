var express = require('express');
var router = express.Router();

var authController = require('../controllers/authController');

//login
router.post(
    '/login', 
    authController.authenticateLoginDetails,
    authController.login
)

//logout
router.post(
    '/:user_id/logout',
    authController.logout

)

module.exports = router;