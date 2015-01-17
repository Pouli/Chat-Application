angular.module('LoginCtrl', []).controller('LoginController', ['$scope', 'socket', '$location',
  function($scope, socket, $location) {
    $scope.pseudo = '';

    $scope.login = function(isValid) {
      if(isValid) {
        $scope.user.name = $scope.pseudo;
        socket.emit('user:new', $scope.user.name);
        $location.path('/home');
      }
    }
  }
]);
