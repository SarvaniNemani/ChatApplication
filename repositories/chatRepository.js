
const dbConnection = require('../knexfile');
const knex = require("knex")(dbConnection);
const socket = require('socket.io-client')('http://localhost:9000')

var sendMessage = function (chat) {
    return new Promise((resolve, reject) => {
        knex('chats')
            .insert(
                chat
            )
            .catch(function (error) {
                reject(error)
            })
            .then(function (data) {
                socket.emit('online-users',chat)
                // console.log(socket)
                resolve(data[0])
            })
    })
};


module.exports = {
    sendMessage: sendMessage,
};
