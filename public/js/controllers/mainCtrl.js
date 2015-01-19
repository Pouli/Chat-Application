angular.module('MainCtrl', []).controller('MainController', ['$scope', '$http', 'socket', 'localStorageService',
  function($scope, $http, socket, localStorageService) {
    $scope.user = {
      name: localStorageService.get('currentUserName'),
      chatroom: localStorageService.get('currentUserChatroom')
    };

    $scope.connectedUsers = [];
    $http.get('/api/connectedUsers').
      success(function(data) {
        $scope.connectedUsers = data.connectedUsers;
      }).
      error(function(err) {
        console.log(err);
      });

    socket.on('user:current', function() {
      $scope.user = {
        name: localStorageService.get('currentUserName'),
        chatroom: localStorageService.get('currentUserChatroom')
      };
    });

    socket.on('user:connected', function() {
      $http.get('/api/connectedUsers').
        success(function(data) {
          $scope.connectedUsers = data.connectedUsers;
        }).
        error(function(err) {
          console.log(err);
        });
    });
  }
]);
