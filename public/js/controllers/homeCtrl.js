angular.module('HomeCtrl', []).controller('HomeController', ['$scope',
  function($scope) {
    $scope.selectedUsers = [];

    $scope.selectUser = function(user) {
      if($scope.selectedUsers.indexOf(user) === -1) {
        $scope.selectedUsers.push(user);
      } else {
        console.log('This user has already been added');
      }
    };

    $scope.unselectUser = function(user) {
      var index = $scope.selectedUsers.indexOf(user);
      $scope.selectedUsers.splice(index, 1);
    };
  }
]);
