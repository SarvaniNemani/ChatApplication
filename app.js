require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var server = require('http').createServer(app);
var socket = require('socket.io')(server,{
    path: '/socket.io'
})
require('./socketio')(socket);


 
loadRoutes()

function loadRoutes() {
    //Routes  
    const authorizationRouter = require('./routes/authRoute');
    const usersRouter = require('./routes/userRoute');
    const chatRoute = require('./routes/chatRoutes')
    app.use(`/chat`, chatRoute)
    app.use(`/auth`, authorizationRouter)
    app.use(`/users`, usersRouter)
}


app.listen('9000', '0.0.0.0', function () {
    console.log('Express server listening on %d, in %s mode', '9000', app.get('env'));
});