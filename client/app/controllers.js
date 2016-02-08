angular.module('MezzoCtrls', ['ngMaterial', 'ngRoute', 'MezzoServices'])
.controller('MenuCtrl', ['$scope', '$http', '$location', '$routeParams', '$timeout', '$mdSidenav', '$log', function($scope, $http, $location, $routeParams, $timeout, $mdSidenav, $log){
  $scope.toggleRight = buildToggler('right');
  $scope.isOpenRight = function(){
    return $mdSidenav('right').isOpen();
  };

  function buildDelayedToggler(navID) {
    return debounce(function() {
      $mdSidenav(navID)
        .toggle();
    }, 200);
  }
  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID)
        .toggle();
    }
  }
}])
.controller('RightCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    $mdSidenav('right').close();
  };
}])
.controller('HomeCtrl', ['$scope', '$http', '$location', '$routeParams', 'travelInfoService', 'Expedia', 'todoService', 'Alchemy', 'newsService', 'Weather', 'weatherService', 'Instagram', 'tagsService', '$interval', 'Geocode', 'geocodeService', 'Places', 'restaurantService', 'hotelService', '$interval', 'Wiki', 'wikiService', function($scope, $http, $location, $routeParams, travelInfoService, Expedia, todoService, Alchemy, newsService, Weather, weatherService, Instagram, tagsService, $interval, Geocode, geocodeService, Places, restaurantService, hotelService, $interval, Wiki, wikiService){

  $scope.travelForm = {
    city: '',
    country: '',
    startDate: '',
    endDate: ''
  };

//Sets the date to the current date & the min date to the current date//
  $scope.myDate = new Date();

  $scope.minDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth(),
      $scope.myDate.getDate());

//Inserts country codes into the dropdown menu//
  $http.get('app/assets/files/country_codes.json')
  .success(function(data){
    $scope.country = data;
  });

//Creates an object fro the form, to be used in all the api calls//
  $scope.makeMagazine = function(city, country, startDate, endDate){

    $scope.travelInfo = {
      city:      city,
      country:   country,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate:   moment(endDate).format('YYYY-MM-DD')
    };

//Service call to pass travelInfo to other controllers//
    travelInfoService.addTravelInfo($scope.travelInfo);

    Geocode.save($scope.travelInfo).$promise.then(function(geocode){

      $scope.geocodeInfo = {
        "lat"     : geocode.geoLocation.results[0].geometry.location.lat,
        "lng"     : geocode.geoLocation.results[0].geometry.location.lng,
        "keyword" : ''
      };

      geocodeService.addGeocodeInfo($scope.geocodeInfo);
      callApis();
    }), function(error) {
      console.log("Error getting geocode.");
    };
    $scope.loading = true;
  }

//Calls all the api's and saves them to services//
var callApis = function(){
  var travelInfo = travelInfoService.getTravelInfo();

  $scope.placesInfo = geocodeService.getGeocodeInfo();

    Expedia.save(travelInfo).$promise.then(function(todo){
       $scope.expedia = todo.thingsToDo;
       todoService.addTodoInfo($scope.expedia);

    }, function(error) {
        $http.get('app/assets/files/test_files/todo_test.json')
        .success(function(data){
          $scope.expedia = data.thingsToDo;
        });
    }).then(function(){
      Alchemy.save(travelInfo).$promise.then(function(news){
        if (news.articles.result) {
         $scope.alchemy = news.articles.result.docs;
         newsService.addNewsInfo($scope.alchemy);
       } else {
         $http.get('app/assets/files/test_files/alchemy_test.json')
         .success(function(data){
           $scope.alchemy = data.articles.result.docs;
           newsService.addNewsInfo($scope.alchemy);
         })
       }
      }, function(error) {
          $http.get('app/assets/files/test_files/alchemy_test.json')
          .success(function(data){
            $scope.alchemy = data.articles.result.docs;
            newsService.addNewsInfo($scope.alchemy);
          });
      }).then(function(){
        Instagram.save(travelInfo).$promise.then(function(tag){
          $scope.instagram = tag.tags;
          tagsService.addTagsInfo($scope.instagram);

        }, function(error) {
            // $http.get('app/assets/files/test_files/tags_test.json')
            // .success(function(data){
            //   $scope.instagram = data.tags;
            // });
            console.log("error getting photos");
        }).then(function(){
          Weather.save(travelInfo).$promise.then(function(forecast){
           $scope.weather = forecast.weather;
           weatherService.addWeatherInfo($scope.weather);

         }, function(error) {
             $http.get('app/assets/files/test_files/weather_test.json')
             .success(function(data){
               $scope.weather = data.weather;
             });
         }).then(function(){
           $scope.placesInfo.keyword = "restaurant";

           Places.save($scope.placesInfo).$promise.then(function(restaurant){
             $scope.restaurants = restaurant.places.results;
             restaurantService.addRestaurantInfo($scope.restaurants);

           }), function(error) {
             $http.get('app/assets/files/test_files/restuarants_test.json')
             .success(function(data){
               $scope.restaurants = data.places.results;
             });
           }
         }).then(function(){
           $scope.placesInfo.keyword = "hotel";

           Places.save($scope.placesInfo).$promise.then(function(hotel){
             $scope.hotels = hotel.places.results;
             hotelService.addHotelInfo($scope.hotels);

           }), function(error) {
             $http.get('app/assets/files/test_files/hotel_test.json')
             .success(function(data){
               $scope.restuarants = data;
             });
           }
         }).then(function(){
           Wiki.save(travelInfo).$promise.then(function(wiki){
             $scope.wiki = wiki.wiki;
             wikiService.addWikiInfo($scope.wiki);

           }), function(error) {
             $http.get('app/assets/files/test_files/wiki_test.json')
             .success(function(data){
               $scope.wiki = data;
             });
           }
         }).then(function(){
           $scope.loading = false;
           $location.path('/table-of-contents');
         });
       });
     });
   });
 }

}])
.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('cyan')
      .accentPalette('amber')
      .dark();
})
.controller('TableCtrl', ['$scope', '$http', '$location', '$routeParams', 'travelInfoService', 'todoService', 'newsService', 'weatherService', 'tagsService', 'restaurantService', 'hotelService', 'wikiService', function($scope, $http, $location, $routeParams, travelInfoService, todoService, newsService, weatherService, tagsService, restaurantService, hotelService, wikiService){

  $scope.travelInfo = travelInfoService.getTravelInfo();

  $scope.expedia = todoService.getTodoInfo();

  $scope.alchemy = newsService.getNewsInfo();

  $scope.weather = weatherService.getWeatherInfo();

  $scope.instagram = tagsService.getTagsInfo();

  $scope.restaurants = restaurantService.getRestaurantInfo();

  $scope.hotels = hotelService.getHotelInfo();

  $scope.wiki = wikiService.getWikiInfo();

}])
.controller('TodoCtrl', ['$scope', '$http', '$location', '$routeParams', 'travelInfoService', 'Expedia', 'Weather', 'ExpediaDetail', '$mdDialog', 'todoService', 'weatherService', function($scope, $http, $location, $routeParams, travelInfoService, Expedia, Weather, ExpediaDetail, $mdDialog, todoService, weatherService){

  $scope.expedia = todoService.getTodoInfo();

  $scope.weather = weatherService.getWeatherInfo();

  $scope.travelInfo = travelInfoService.getTravelInfo();

  $scope.showDialog = showDialog;

  function showDialog($event, id) {
  var thisEvent = $event;
    ExpediaDetail.save({'id' : id}).$promise.then(function(data){
    $scope.expediaDetail = data.thingsToDoDetail;

    var parentEl = angular.element(document.body);

    $mdDialog.show({
      parent: parentEl,
      scope: $scope,
      targetEvent: event,
      templateUrl: "../app/views/partials/todoDialog.html",
      controller: DialogController,
     });

     function DialogController($scope, $mdDialog) {
       $scope.closeDialog = function() {
         $mdDialog.hide();
       }
     }
    });
  }

}])
.controller('NewsCtrl', ['$scope', '$http', '$location', '$routeParams', 'Alchemy', 'travelInfoService', '$mdDialog', 'newsService', 'weatherService', function($scope, $http, $location, $routeParams, Alchemy, travelInfoService, $mdDialog, newsService, weatherService){

  $scope.travelInfo = travelInfoService.getTravelInfo();

  $scope.alchemy = newsService.getNewsInfo();

  var noNews = function(){
    if ($scope.alchemy) {
      $scope.alchemy =
          [
            {"source":
              {"enriched":
                {"url":
                  {"title": "No Articles Found."
                }
              }
            }
          }
        ]

    }
  }

  $scope.weather = weatherService.getWeatherInfo();

  $scope.showDialog = showDialog;

  function showDialog($event, $index) {
    var parentEl = angular.element(document.body);

    $mdDialog.show({
      parent: parentEl,
      scope: $scope,
      targetEvent: $scope,
      templateUrl: "../app/views/partials/newsDialog.html",
      locals: {
             items: $scope.alchemy[$index]
           },
      controller: DialogController,
     });
     function DialogController($scope, $mdDialog, items){
       $scope.alchemyDialog = items
       $scope.closeDialog = function() {
         $mdDialog.hide();
       }
     }
   }

}])
.controller('PhotosCtrl', ['$scope', '$http', '$location', '$routeParams', '$mdDialog', 'Instagram', 'tagsService', 'travelInfoService', 'weatherService', function($scope, $http, $location, $routeParams, $mdDialog, Instagram, tagsService, travelInfoService, weatherService){

  $scope.weather = weatherService.getWeatherInfo();

  $scope.instagram = tagsService.getTagsInfo();

  $scope.createTile = function() {
    $scope.photos = [];
    for (var i = 0; i < $scope.instagram.length; i++) {
      $scope.photos.push({
        images: $scope.instagram[i].images,
        caption: $scope.instagram[i].caption,
        link: $scope.instagram[i].link,
        location: $scope.instagram[i].location,
        tags: $scope.instagram[i].tags,
      });
    }
    return $scope.photos;
  };

  function randomSpan() {
    var r = Math.random();
    if (r < 0.8) {
      return 1;
    } else if (r < 0.9) {
      return 1;
    } else {
      return 1;
    }
  }

  $scope.showDialog = showDialog;

  function showDialog($event, $index) {
    var parentEl = angular.element(document.body);

    $mdDialog.show({
      parent: parentEl,
      scope: $scope,
      ariaLabel: 'picture',
      clickOutsideToClose: true,
      targetEvent: $scope,
      templateUrl: "../app/views/partials/photosDialog.html",
      locals: {
             items: $scope.photos[$index]
           },
      controller: DialogController,
     });
     function DialogController($scope, $mdDialog, items){
       $scope.fullPhoto = items
       $scope.closeDialog = function() {
         $mdDialog.hide();
       }
     }
   }

}])
.controller('WikiCtrl', ['$scope', '$http', '$location', '$routeParams', '$mdDialog', 'Wiki', 'wikiService', 'travelInfoService', 'weatherService', '$sce', function($scope, $http, $location, $routeParams, $mdDialog, Wiki, wikiService, travelInfoService, weatherService, $sce){

  $scope.weather = weatherService.getWeatherInfo();

  $scope.wiki = wikiService.getWikiInfo();
    var wikiId = Object.keys($scope.wiki.query.pages)
    $scope.wiki = $scope.wiki.query.pages[wikiId].extract;
    $scope.wiki = $sce.trustAsHtml($scope.wiki);

}])
.controller('RestaurantCtrl', ['$scope', '$http', '$location', '$routeParams', '$mdDialog', 'Places', 'restaurantService', 'travelInfoService', 'weatherService', function($scope, $http, $location, $routeParams, $mdDialog, Places, restaurantService, travelInfoService, weatherService){

  $scope.weather = weatherService.getWeatherInfo();

  $scope.restaurants = restaurantService.getRestaurantInfo();

}])
.controller('MapCtrl', ['$scope', '$http', '$location', '$routeParams', 'geocodeService', 'Weather', 'weatherService', function($scope, $http, $location, $routeParams, geocodeService, Weather, weatherService){

  var geometry = geocodeService.getGeocodeInfo();

  $scope.weather = weatherService.getWeatherInfo();

  $scope.initMap = function() {
    $scope.geocodeInfo = geometry;
    var lat = $scope.geocodeInfo.lat;
    var lng = $scope.geocodeInfo.lng;

    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
      center: {lat: lat, lng: lng},
      zoom: 8
    });
  }

}])
.controller('HotelsCtrl', ['$scope', '$http', '$location', '$routeParams', 'Weather', 'weatherService', 'hotelService', function($scope, $http, $location, $routeParams, Weather, weatherService, hotelService){

  $scope.weather = weatherService.getWeatherInfo();

  $scope.hotels = hotelService.getHotelInfo();

}]);
