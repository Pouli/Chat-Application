angular.module('LoginCtrl', []).controller('LoginController', ['$scope', '$rootScope', 'socket', '$location',
  function($scope, $rootScope, scoket, $location) {
    $scope.pseudo = '';

    $scope.login = function(isValid) {
      if(isValid) {
        $rootScope.pseudo = $scope.pseudo;
        $location.path('/chat');
      }
    }
  }
]);
