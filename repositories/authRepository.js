const dbConnection = require('../knexfile');
const knex = require("knex")(dbConnection);

function getUserForUsername(username) {
    return new Promise((resolve, reject) => {
        let query = `SELECT DISTINCT user.id, user.username, user.password, user.full_name, user.email from user
                    where user.username = "${username}";`
        knex.raw(query)
            .catch( function(error) {
                reject(error)
            })
            .then(function(user) {
                try {
                    console.log(user[0][0])
                    let details = user[0][0]
                    if (details.id) {
                        resolve(details)
                    } else {
                        resolve()
                    }
                } catch (error) {
                    resolve()
                }
            })
    })
}

function insertToken(data) {
    return new Promise((resolve, reject) => {

        knex('user_access_token')
            .insert(data)
            .catch(function (error) {
                reject(error)
            })
            .then(function (insertId) {
                console.log("insertId", insertId)
                resolve()
            }) 
    })  
}

function insertRefreshToken(refreshdata) {
    return new Promise((resolve, reject) => {
        knex('user_refresh_token')
        .insert(refreshdata)
        .catch( function(error) {
            reject(error)
        })
        .then(function( insertId) {
            resolve()
        })
    })
}

function getUserToken(userid, token) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM user_access_token WHERE user_id = "${ userid }" and token = "${ token }"
                    and expiry_date > now(); `

        knex.raw(query)
            .catch(function (error) {
                reject(error)
            })
            .then(function (res) {
                if(res[0][0] != null) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }) 
    })  

}

function removeToken(token) {
    return new Promise((resolve, reject) => {
        // let query = `DELETE FROM user_access_token WHERE user_id = "${userid}";`
        let query = `DELETE user_access_token, user_refresh_token FROM user_access_token
                     INNER JOIN user_refresh_token ON user_access_token.token = user_refresh_token.access_token
                     WHERE user_access_token.token = "${token}" 
                     and user_refresh_token.access_token = "${token}";`
        console.log(query);
        knex.raw(query)
            .catch(function (error) {
                reject(error)
            })
            .then(function() {
                resolve()
            })
    })
}

module.exports = {
    getUserForUsername,
    insertToken,
    insertRefreshToken,
    getUserToken,
    removeToken
}
