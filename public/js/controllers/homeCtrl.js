angular.module('HomeCtrl', []).controller('HomeController', ['$scope', 'socket',
  function($scope, socket) {
    $scope.message = '';
    $scope.messages = [];

    $scope.sendMessage = function(isValid) {
      if(isValid) {
        socket.emit('message', $scope.message);
        $scope.messages.push($scope.message);
      }
    };

    socket.on('message', function(message) {
      $scope.messages.push(message);
    });
  }
]);
