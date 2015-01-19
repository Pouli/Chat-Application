angular.module('LoginCtrl', []).controller('LoginController', ['$scope', 'socket', '$http', '$location', 'localStorageService',
  function($scope, socket, $http, $location, localStorageService) {
    $scope.pseudo = '';

    $scope.login = function(isValid) {
      if(isValid) {
        localStorageService.set('currentUserName', $scope.pseudo);
        localStorageService.set('currentUserChatroom', 'default');
        localStorageService.set('invitations', []);

        var username = localStorageService.get('currentUserName');

        socket.emit('user:getId');
        socket.on('user:returnId', function(socketId) {
          $http.post('/api/connectedUser', {name: username, id: socketId}).
            success(function(data) {
              if(data.success) {
                socket.emit('user:new', {name: username, id: socketId});
                $location.path('/home');
              } else {
                console.log('This username has already been taken');
                $location.path('/login');
              }
            }).
            error(function(err) {
              console.log(err);
              $location.path('/login');
            });
        });
      }
    }
  }
]);
