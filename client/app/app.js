var app = angular.module('MezzoApp', ['ngRoute', 'ngMaterial', 'MezzoCtrls', 'MezzoServices'])
.config(function($mdThemingProvider, $mdIconProvider){
  $mdThemingProvider.theme('default')
    .dark()
    .primaryPalette('blue-grey')
    .accentPalette('red');
}).
filter('htmlToPlaintext', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
);


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
