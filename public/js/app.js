angular.module('chat', [
  'ngRoute',
  'LocalStorageModule',
  'appRoutes',
  'appLocalStorage',
  'MainCtrl',
  'LoginCtrl',
  'HomeCtrl',
  'ChatCtrl',
  'socket',
  'connectedUsersService',
  'btford.socket-io'
]);
