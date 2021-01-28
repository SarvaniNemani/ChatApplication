var onlineUserRepository = require('../repositories/onlineUserRepository')

exports.getOnlineUsers = async (req,res) => {
    try{
        let onlineUsers =await onlineUserRepository.getOnlineUsers()
        res.status(200).send({
            "status_code": 200,
            "onlineUsers": onlineUsers,
        })
    }
    catch (error) {
        res.status(500)
            .send({
                "status_code": 500,
                "message": error.message
            })
    } 
}


