const dbConnection = require('../knexfile');
const knex = require("knex")(dbConnection);

function createUser (user) {
    return new Promise((resolve, reject) => {
        knex('user')
        .insert(user)
        .catch(function (error){
            reject(error);
        })
        .then(function (insertId) {
            console.log("insertId", insertId[0]),
            resolve(insertId[0])
        })
    })
}

module.exports = {
    createUser,
}