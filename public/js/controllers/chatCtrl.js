angular.module('ChatCtrl', []).controller('ChatController', ['$scope', 'socket',
  function($scope, socket) {
    $scope.message = '';
    $scope.messages = [];

    $scope.sendMessage = function(isValid) {
      if(isValid) {
        socket.emit('message', {user: $scope.user, text: $scope.message});
        $scope.messages.push({user: $scope.user, text: $scope.message});
      }
    };

    socket.on('message', function(message) {
      $scope.messages.push(message);
    });

  }
]);
