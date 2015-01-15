module.exports = function(io) {
  io.on('connection', function(socket) {
    socket.on('message', function(message) {
      socket.broadcast.emit('message', message);
    });
  });
}
