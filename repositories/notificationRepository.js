
const dbConnection = require('../knexfile');
const knex = require("knex")(dbConnection);

var createNotification = function (from_id,to_id,chat_id) {
    return new Promise((resolve, reject) => {
        knex('notifications')
            .insert(
                from_id,to_id,chat_id
            )
            .catch(function (error) {
                reject(error)
            })
            .then(function (notification) {
                resolve(notification)
            })
    })
};


module.exports = {
    createNotification: createNotification,
};
