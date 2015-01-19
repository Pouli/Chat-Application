module.exports = function(io) {
  io.on('connection', function(socket) {

    socket.on('disconnect', function() {
      console.log('Disconnected');
    })

    socket.on('message', function(message) {
      socket.broadcast.to(message.user.chatroom).emit('message', message);
    });

    socket.on('user:getId', function() {
      socket.emit('user:returnId', socket.id);
    });

    socket.on('user:new', function(newUser) {
      socket.emit('user:current', 'OK');
      io.sockets.emit('user:connected');
    });

    socket.on('invitation:send', function(users) {
      var randomId = '_' + Math.random().toString(36).substr(2, 9);
      users.selected.forEach(function(user) {
        io.sockets.connected[user.id].emit('invitation', {chatroom: randomId, user: users.user.name});
      });
      socket.leave(users.user.chatroom);
      socket.join(randomId);
      socket.emit('chatroom:redirection', randomId);
    });

    socket.on('chatroom:join', function(chatroom) {
      socket.leave(chatroom.old);
      socket.join(chatroom.new);
    });
  },{'sync disconnect on unload': true });
}
