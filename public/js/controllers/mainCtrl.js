angular.module('MainCtrl', []).controller('MainController', ['$scope', 'socket', 'localStorageService', 'connectedUsersService',
  function($scope, socket, localStorageService, connectedUsersService) {
    //Scope variables
    $scope.user = {
      name: localStorageService.get('currentUserName'),
      chatroom: localStorageService.get('currentUserChatroom')
    };

    $scope.connectedUsers = [];
    connectedUsersService.updateConnectedUsers(function(connectedUsers) {
      $scope.connectedUsers = connectedUsers;
    });

    //Socket events
    socket.on('user:current', function() {
      $scope.user = {
        name: localStorageService.get('currentUserName'),
        chatroom: localStorageService.get('currentUserChatroom')
      };
    });

    socket.on('user:connected', function() {
      connectedUsersService.updateConnectedUsers(function(connectedUsers) {
        $scope.connectedUsers = connectedUsers;
      });
    });
  }
]);
