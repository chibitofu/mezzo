var app = angular.module('MezzoApp', ['ngRoute', 'ngMaterial', 'MezzoCtrls', 'MezzoServices', 'ngMdIcons'])
.config(function($mdThemingProvider, $mdIconProvider){
  $mdThemingProvider.theme('default')
    .dark()
    .primaryPalette('cyan')
    .accentPalette('amber');
})
.filter('htmlToPlaintext', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
)
.filter('words', function () {
  return function (input, words) {
    if (isNaN(words)) {
      return input;
    }
    if (words <= 0) {
      return '';
    }
    if (input) {
      var inputWords = input.split(/\s+/);
      if (inputWords.length > words) {
        input = inputWords.slice(0, words).join(' ') + '\u2026';
      }
    }
    return input;
  };
})
.filter('isNA', function () {
  return function (val) {
    if (val > 0) {
      return val + "/100";
    } else {
      return "NA"
    }
  }
})
.filter('hashGone', function() {
  return function(word) {
    word = word.replace(/#(\S*)/g, '');
    return word;
  }
});

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $routeProvider
  .when('/', {
    templateUrl: 'app/views/home.html',
    controller: 'HomeCtrl'
  })
  .when('/table-of-contents', {
    templateUrl: 'app/views/table-of-contents.html',
    controller: 'TableCtrl'
  })
  .when('/todo', {
    templateUrl: 'app/views/todo.html',
    controller: 'TodoCtrl'
  })
  .when('/news', {
    templateUrl: 'app/views/news.html',
    controller: 'NewsCtrl'
  })
  .when('/photos', {
    templateUrl: 'app/views/photos.html',
    controller: 'PhotosCtrl'
  })
  .when('/wiki', {
    templateUrl: 'app/views/wiki.html',
    controller: 'WikiCtrl'
  })
  .when('/restaurant', {
    templateUrl: 'app/views/restaurant.html',
    controller: 'RestaurantCtrl'
  })
  .otherwise({
    templateUrl: 'app/views/404.html'
  });

  $locationProvider.html5Mode(true);
}]);
