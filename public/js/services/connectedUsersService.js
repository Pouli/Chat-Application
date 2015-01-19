angular.module('connectedUsersService', []).factory('connectedUsersService', function($http) {

  return {
    updateConnectedUsers: function(callback) {
      $http.get('/api/connectedusers').
        success(function(data) {
          return callback(data.connectedUsers);
        }).
        error(function(err) {
          return callback([]);
          console.log(err);
        });
    }
  }
});
