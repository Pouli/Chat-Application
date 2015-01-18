angular.module('MainCtrl', []).controller('MainController', ['$scope', 'socket',
  function($scope, socket) {
    $scope.user = {name: '', chatroom: 'default'};
    $scope.connectedUsers = [];

    socket.on('user:connected', function(connectedUsers) {
      $scope.connectedUsers = connectedUsers;
    })
  }
]);
