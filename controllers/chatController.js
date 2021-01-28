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
            "data": chat,
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

exports.readMessage = async (req, res) => {
    try {
        id = req.params.id
        let status = await chatRepository.readMessage(id)
        res.status(200).send({
            "status_code": 200,
        })
    } catch (error) {
        res.status(500)
            .send({
                "status_code": 500,
                "message": error.message
            })
    }
}

exports.readNotification = async (req, res) => {
    try {
        id = req.params.id
        let status = await chatRepository.readNotification(id)
        res.status(200).send({
            "status_code": 200,
        })
    } catch (error) {
        res.status(500)
            .send({
                "status_code": 500,
                "message": error.message
            })
    }
}

exports.getNotifications = async (req, res) => {
    try {
        id = req.params.to_id
        let notifications = await chatRepository.getNotifications(id)
        res.status(200).send({
            "status_code": 200,
            "notifications": notifications
        })
    } catch (error) {
        res.status(500)
            .send({
                "status_code": 500,
                "message": error.message
            })
    }
}

exports.getChat = async (req, res) => {
    try {
        id = req.params.to_id
        let chat = await chatRepository.getChat(id)
        res.status(200).send({
            "status_code": 200,
            "chat": chat
        })
    } catch (error) {
        res.status(500)
            .send({
                "status_code": 500,
                "message": error.message
            })
    }
}

