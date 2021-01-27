const { StatusCodes } = require("http-status-codes");
const helper = require("../helpers/helper");
const authorizationRepository = require("../repositories/authRepository");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
var bcrypt = require('bcryptjs');

async function authenticateLoginDetails(req, res, next) {
    try {
        //getting user
        var user = await authorizationRepository.getUserForUsername(req.body.username);
        // user does not exist
        if(!user) {
            return res.status(StatusCodes.NOT_FOUND)
            .send({
                "message": "Username does not exist"
            })
        }
        //compare passwords
        var success = await helper.comparePasswords(req.body.password, user.password);
        console.log(success);
        // console.log("validate password",success)

        //wrong password
        if(success == false) {
            res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
            .send({
                "message": "Invalid credentials"
            })
        }
        //success
        req.user = user;
        next()
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
            "message": error.message
        })
        
    }

}

async function login(req, res) {
    try {
        var user = req.user;
        // generate access token
        var token = uuidv4();
        var accessExpiry = new moment(Date.now()).add(2, 'hours').format('YYYY-MM-DD HH:mm:ss');
        var data = {
            "user_id": user.id,
            "token": token,
            "expiry_date": accessExpiry
        }
        var insertId = await authorizationRepository.insertToken(data)
                
        // generate refresh token
        var refresh_token = uuidv4();
        var refreshExpiry = new moment(Date.now()).add(20, 'hours').format('YYYY-MM-DD HH:mm:ss');
        var refreshData = {
            "user_id": user.id,
            "refresh_token": refresh_token,
            "access_token": token,
            "expiry_date": refreshExpiry
        }

        var reftoken = await authorizationRepository.insertRefreshToken(refreshData)
        res.status(StatusCodes.OK)
        .send({
            "token": token,
            "refresh_token": refresh_token,
            "user": {
                "id": user.id,
                "username": user.username,
                "full_name": user.full_name,
                "email": user.email
            }
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
            "message": error.message
        })
        
    }
}

async function logout(req, res) {
    try {
        // let userId = req.params.user_id;
        var token = req.headers['authorization'];
        
        // var insertId = await authorizationRepository.removeToken(userId);
        var insertId = await authorizationRepository.removeToken(token);
        res.status(StatusCodes.OK)
        .send({
            "message" : "logged out"
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
            "message": error.message
        })
    }
}
module.exports = {
    authenticateLoginDetails,
    login,
    logout
}