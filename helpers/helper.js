const bcrypt = require('bcryptjs');
const authorizationRepository = require('../repositories/authRepository');
const StatusCodes = require('http-status-codes').StatusCodes;
const onlineUserRepository = require('../repositories/onlineUserRepository')
function comparePasswords(input, hash) {
    console.log("comparePasswords", input);
    return new Promise((resolve, reject) => {
        bcrypt.compare(input, hash, function(err, res) {
            console.log(err, res);
            if(err) {
                reject(err)
            } else {
                resolve(res)
                console.log("end")
            }
        });
    });
}

async function authorize(req, res, next) {
    try {
        var token = req.headers['authorization'];
        var userid = req.headers['user_id'];
        var success = await authorizationRepository.getUserToken(userid, token);
        console.log(success,":::::::")
        if(success == false) {
            // await onlineUserRepository.removeUserFromOnline(userid)
            res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
            .send({
                "message": "Invalid token or token expired"
            })
        }
        else 
        req.user = success
        //success
        next()
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
            "message": error.message
        })        
    }
    
}

module.exports = {
    comparePasswords,
    authorize
}