angular.module('socket', []).factory('socket', function(socketFactory) {
  console.log(socketFactory());
  return socketFactory();
});
