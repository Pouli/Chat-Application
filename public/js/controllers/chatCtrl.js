angular.module('ChatCtrl', []).controller('ChatController', ['$scope', '$rootScope', 'socket',
  function($scope, $rootScope, socket) {
    $scope.message = '';
    $scope.messages = [];

    console.log($rootScope.pseudo);

    $scope.sendMessage = function(isValid) {
      if(isValid) {
        socket.emit('message', {user: $rootScope.pseudo, text: $scope.message});
        $scope.messages.push({user: $rootScope.pseudo, text: $scope.message});
      }
    };

    socket.on('message', function(message) {
      $scope.messages.push(message);
    });
  }
]);
