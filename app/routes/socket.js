module.exports = function(io) {
  var connectedUsers = [];

  io.on('connection', function(socket) {
    socket.on('message', function(message) {
      socket.broadcast.to(message.user.chatroom).emit('message', message);
    });

    socket.on('user:new', function(newUser) {
      connectedUsers.push({name: newUser, id: socket.id});
      io.sockets.emit('user:connected', connectedUsers);
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
  });
}
