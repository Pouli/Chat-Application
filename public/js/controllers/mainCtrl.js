angular.module('MainCtrl', []).controller('MainController', ['$scope', 'socket',
  function($scope, socket) {
    $scope.user = {name: ''};
    $scope.connectedUsers = [];

    socket.on('user:connected', function(connectedUsers) {
      $scope.connectedUsers = connectedUsers;
      console.log($scope.users);
    })
  }
]);
