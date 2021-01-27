



/**
 * Socket.io configuration
 */

'use strict';

// var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {
  console.log("Disconnection process$$$$$$$")
  socket.disconnect();
}

// When the user connects.. perform this
function onConnect(socket) {
  socket.on('send-message', function (data) {
    socket.broadcast.emit('send-message', data);
  });
  socket.on('online-users', function (data) {
    socket.broadcast.emit('online-users', data);
  });
}

module.exports = function (socketio) {
  socketio.on('connection', function (socket) {
    console.log("/////")
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();
    // Call onDisconnect.
    socket.on('disconnect', function () {
      console.log("In Disconnect method*****")
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });
    onConnect(socket);
    console.info('[%s] CONNECTED nnnnnn', socket.address);
  });
};
