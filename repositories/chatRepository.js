
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

var readMessage = function (id) {
    return new Promise((resolve, reject) => {
        knex('chats')
            .where('id', id)
            .update({read: true})
            .catch(function (error) {
                reject(error)
            })
            .then(function (insertId) {
                resolve(insertId);
            })
    })
}

var readNotification = function (id) {
    return new Promise((resolve, reject) => {
        knex('notifications')
            .where('id', id)
            .update({read: true})
            .catch(function (error) {
                reject(error)
            })
            .then(function (insertId) {
                resolve(insertId);
            })
    })
}

var getNotifications = function (id) {
    return new Promise((resolve, reject) => {
        knex.select('notifications')
            .where('to_id', id)
            .catch(function (error) {
                reject(error)
            })
            .then(function (data) {
                resolve(data[0]);
            })
    })
}

var getChat = function (id) {
    return new Promise((resolve, reject) => {
        knex.select('message')
            .from('chats')
            .where('to_id', id)
            .catch(function (error) {
                reject(error)
            })
            .then(function (data) {
                resolve(data);
            })
    })
}

module.exports = {
    sendMessage: sendMessage,
    readMessage,
    readNotification,
    getNotifications,
    getChat
};
