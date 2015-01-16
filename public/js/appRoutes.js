angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/chat', {
        templateUrl:'./views/chat.html',
        controller: 'ChatController'
      }).
      when('/login', {
        templateUrl: './views/login.html',
        controller: 'LoginController'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }
]);
