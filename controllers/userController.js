var userRepository = require('../repositories/userRepository');
const StatusCodes = require('http-status-codes').StatusCodes;
var bcrypt = require('bcryptjs');
const constants = require('../helpers/constants');

async function createUser(req, res) {
    console.log(req.body);

    try {
        // creating new user
        let user = req.body;
        let full_name = user.first_name + user.last_name;
        user.full_name = full_name;
        var salt = bcrypt.genSaltSync(constants.saltRounds);
        var passwordHash = bcrypt.hashSync(req.body.password, salt);
        user.password = passwordHash;
        await userRepository.createUser(user);
        
        // sending response
        res.status(StatusCodes.CREATED)
        .send({
            "message": "success"
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
            "message": error.message
        })
    }
    
}

module.exports = {
    createUser,    
}