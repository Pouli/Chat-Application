angular.module('ChatCtrl', []).controller('ChatController', ['$scope', 'socket', '$location',
  function($scope, socket, $location) {
    $scope.message = '';
    $scope.messages = [];

    $scope.sendMessage = function(isValid) {
      if(isValid) {
        socket.emit('message', {user: $scope.user, text: $scope.message});
        $scope.messages.push({user: $scope.user, text: $scope.message});
      }
    };

    $scope.quitChat = function() {
      $location.path('/home');
    }

    socket.on('message', function(message) {
      $scope.messages.push(message);
    });

  }
]);
