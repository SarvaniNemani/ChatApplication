
const dbConnection = require('../knexfile');
const knex = require("knex")(dbConnection);
const socket = require('socket.io-client')('http://localhost:9000')

var createNotification = function (from_id,to_id,chat_id) {
    return new Promise((resolve, reject) => {
        knex('notifications')
            .insert({
                from_id:from_id,
                to_id:to_id,
                chat_id:chat_id
            })
            .catch(function (error) {
                reject(error)
            })
            .then(function (notification) {
                socket.emit('notifications',chat)
                resolve(notification)
            })
    })
};


module.exports = {
    createNotification: createNotification,
};
