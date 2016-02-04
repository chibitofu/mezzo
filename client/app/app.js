var app = angular.module('MezzoApp', ['ngRoute', 'ngMaterial', 'MezzoCtrls', 'MezzoServices']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $routeProvider
  .when('/', {
    templateUrl: 'app/views/home.html',
    controller: 'HomeCtrl'
  })
  .when('/magazine', {
    templateUrl: 'app/views/magazine.html',
    controller: 'MagazineCtrl'
  })
  .otherwise({
    templateUrl: 'app/views/404.html'
  });

  $locationProvider.html5Mode(true);
}]);
