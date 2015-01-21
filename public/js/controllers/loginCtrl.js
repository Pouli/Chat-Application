angular.module('LoginCtrl', []).controller('LoginController', ['$scope', 'socket', '$location', 'localStorageService',
  function($scope, socket, $location, localStorageService) {
    //Scope variables
    $scope.pseudo = '';

    //Scope functions
    $scope.login = function(isValid) {
      if(isValid) {
        localStorageService.set('currentUserName', $scope.pseudo);
        localStorageService.set('currentUserChatroom', 'default');
        localStorageService.set('invitations', []);

        var username = localStorageService.get('currentUserName');
        socket.connect();
        socket.emit('user:new', {name: username});
        socket.on('user:return', function(data) {
          if(data.success) {
            console.log(data.message);
            $location.path('/home');
          } else {
            console.log(data.message);
            $location.path('/login');
          }
        });
      }
    };
  }
]);
