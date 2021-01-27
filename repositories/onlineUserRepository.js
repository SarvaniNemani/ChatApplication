const dbConnection = require('../knexfile');
const knex = require("knex")(dbConnection);
const socket = require('socket.io-client')('http://localhost:9000')

var createOnlineUser = function (user) {
    return new Promise((resolve, reject) => {
        console.log(user,"userrrrrrrrrrr")
        knex('onlineusers')
            .insert(
                { user_id: user.user_id, active: true }
            )
            .onConflict('user_id')
            .merge(
                { user_id: user.user_id, active: true }
            )
            .catch(function (error) {
                reject(error)
            })
            .then(function (data) {
                socket.emit('send-message', { user_id: user.user_id, active: true })
                resolve(data)
            })
    })
};

var getOnlineUsers = function () {
    return new Promise((resolve, reject) => {
        let query = `SELECT  *
                FROM onlineusers where active = true`
        knex.raw(query)
            .catch(function (error) {
                reject(error)
            })
            .then(function (user) {
                if (user[0][0]) {
                    resolve(user[0][0])
                } else {
                    resolve()
                }
            })
    })
};

var removeUserFromOnline = function (userid) {
    return new Promise((resolve, reject) => {
        
        let query=`
        UPDATE onlineusers
        SET active = false 
        WHERE EXISTS (SELECT *
        FROM onlineusers
        WHERE onlineusers.user_id = ${userid});`
        knex.raw(query)
        .catch(function (error) {
            reject(error)
        })
        .then(function (res) {
            console.log(res[0][0],"????????????")
            if(res[0][0] != null) {
                socket.emit('send-message',res[0][0])
                resolve(res[0][0])
            } else {
                resolve(false)
            }
        }) 
    })
};
module.exports = {
    createOnlineUser: createOnlineUser,
    getOnlineUsers: getOnlineUsers,
    removeUserFromOnline: removeUserFromOnline
};