angular.module('HomeCtrl', []).controller('HomeController', ['$scope', 'socket', '$location',
  function($scope, socket, $location) {
    $scope.selectedUsers = [];
    $scope.invitations = [];

    $scope.selectUser = function(user) {
      if($scope.selectedUsers.length < 4) {
        if($scope.selectedUsers.indexOf(user) === -1) {
          $scope.selectedUsers.push(user);
        } else {
          console.log('This user has already been added');
        }
      } else {
        console.log('Chat are limited to 5 users');
      }
    };

    $scope.unselectUser = function(user) {
      var index = $scope.selectedUsers.indexOf(user);
      $scope.selectedUsers.splice(index, 1);
    };

    $scope.sendInvitation = function() {
      socket.emit('invitation:send', {user: $scope.user, selected: $scope.selectedUsers});
      $scope.selectedUsers = [];
    }

    $scope.joinChat = function(chatroom) {
      var old = $scope.user.chatroom;
      $scope.user.chatroom = chatroom;
      socket.emit('chatroom:join', {new: $scope.user.chatroom, old: old});
      $location.path('/chat');
    }

    socket.on('chatroom:redirection', function(newChatroom) {
      $scope.user.chatroom = newChatroom;
      $location.path('/chat');
    });

    socket.on('invitation', function(invitation) {
      $scope.invitations.push(invitation);
    })
  }
]);
