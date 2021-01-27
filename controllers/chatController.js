var chatRepository = require('../repositories/chatRepository')
const notificationRepository = require('../repositories/notificationRepository')

exports.sendMessage = async (req,res) => {
    try{
        // console.log(req.user,">>>>>>>>>>>")
        req.body.from_id = req.user. user_id
        let chat =await chatRepository.sendMessage(req.body)
        const { from_id,to_id } = req.body
        const chat_id = chat
        // await notificationRepository.createNotification(from_id,to_id,chat_id)
        res.status(200).send({
            "status_code": 200,
            "access_code": chat,
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


