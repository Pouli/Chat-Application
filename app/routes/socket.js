var mongoose = require('mongoose');
var ConnectedUser = require('../models/connectedUser');

module.exports = function(io) {
  io.on('connection', function(socket) {

    //Socket events
    socket.on('user:new', function(newUser) {
      addUser(mongoose, ConnectedUser, newUser.name, socket.id, function(data) {
        socket.emit('user:return', data);
        socket.emit('user:current');
        io.sockets.emit('user:connected');
      });
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

    socket.on('message', function(message) {
      socket.broadcast.to(message.user.chatroom).emit('message', message);
    });

    socket.on('disconnect', function() {
      removeUser(mongoose, ConnectedUser, socket.id, function(data) {
        console.log(data.message);
        io.sockets.emit('user:connected');
      });
    });
  },{'sync disconnect on unload': true });
}

//Function to add a connected user to the database
function addUser(mongoose, Model, userName, socketId, callback) {
  Model.findOne({'name': userName}, function(err, user) {
    if(err) {
      return callback({success: false, message: err});
    }
    if(user) {
      return callback({success: false, message: 'This username has already been taken'});
    } else {
      var newModel = new Model();
      newModel.name = userName;
      newModel.id = socketId;

      newModel.save(function(err) {
        if(err)
          return callback({success: false, message: err});
        return callback({success: true, message: 'User has been added'});
      });
    }
  });
}

//Function to remove a connected user from the database
function removeUser(mongoose, Model, socketId, callback) {
  Model.findOneAndRemove({'id': socketId}, function(err) {
    if(err) {
      return callback({success: false, message: err});
    } else {
      return callback({success: true, message: 'Disconnected'});
    }
  });
}
