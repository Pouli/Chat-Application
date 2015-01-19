angular.module('HomeCtrl', []).controller('HomeController', ['$scope', 'socket', '$location', 'localStorageService',
  function($scope, socket, $location, localStorageService) {
    $scope.selectedUsers = [];
    $scope.invitations = localStorageService.get('invitations');

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

    $scope.joinChat = function(invitation) {
      var old = $scope.user.chatroom;
      localStorageService.set('currentUserChatroom', invitation.chatroom);
      $scope.user.chatroom = localStorageService.get('currentUserChatroom');
      socket.emit('chatroom:join', {new: $scope.user.chatroom, old: old});
      removeInvitation(localStorageService, invitation);
      $scope.invitations = localStorageService.get('invitations');
      $location.path('/chat');
    }

    socket.on('chatroom:redirection', function(newChatroom) {
      localStorageService.set('currentUserChatroom', newChatroom);
      $scope.user.chatroom = newChatroom;
      $location.path('/chat');
    });

    socket.on('invitation', function(invitation) {
      addInvitation(localStorageService, invitation);
      $scope.invitations = localStorageService.get('invitations');
    })

    function addInvitation(localStorageService, invitation) {
      var temp = localStorageService.get('invitations');
      temp.push(invitation);
      localStorageService.set('invitations', temp);
    }

    function removeInvitation(localStorageService, invitation) {
      var temp = localStorageService.get('invitations');
      var index = temp.indexOf(invitation);
      temp.splice(index, 1);
      localStorageService.set('invitations', temp);
    };
  }
]);
