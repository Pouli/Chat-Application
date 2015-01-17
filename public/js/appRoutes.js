angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: './views/login.html',
        controller: 'LoginController'
      }).
      when('/home', {
        templateUrl: './views/home.html',
        controller: 'HomeController'
      }).
      when('/chat', {
        templateUrl:'./views/chat.html',
        controller: 'ChatController'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }
]);
