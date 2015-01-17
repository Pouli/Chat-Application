module.exports = function(io) {
  var connectedUsers = [];

  io.on('connection', function(socket) {
    socket.on('message', function(message) {
      socket.broadcast.emit('message', message);
    });

    socket.on('user:new', function(newUser) {
      connectedUsers.push(newUser);
      io.sockets.emit('user:connected', connectedUsers);
    });
  });
}
