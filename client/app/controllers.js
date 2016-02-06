angular.module('MezzoCtrls', ['ngMaterial', 'ngRoute', 'MezzoServices'])
.controller('MenuCtrl', ['$scope', '$http', '$location', '$routeParams', '$timeout', '$mdSidenav', '$log', function($scope, $http, $location, $routeParams, $timeout, $mdSidenav, $log){
  $scope.toggleRight = buildToggler('right');
  $scope.isOpenRight = function(){
    return $mdSidenav('right').isOpen();
  };
  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  function buildDelayedToggler(navID) {
    return debounce(function() {
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }
  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }
  }
}])
.controller('RightCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    $mdSidenav('right').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };
}])
.controller('HomeCtrl', ['$scope', '$http', '$location', '$routeParams', 'travelInfoService', 'Expedia', 'todoService', 'Alchemy', 'newsService', 'Weather', 'weatherService', 'Instagram', 'tagsService', '$interval', function($scope, $http, $location, $routeParams, travelInfoService, Expedia, todoService, Alchemy, newsService, Weather, weatherService, Instagram, tagsService, $interval){

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
    travelInfoService.addTravelInfo($scope.travelInfo)
    callApis();
  }

//Calls all the api's and saves them to services//
var callApis = function(){
  var travelInfo = travelInfoService.getTravelInfo();

    Expedia.save(travelInfo).$promise.then(function(todo){
      //  $scope.expedia = todo.thingsToDo;
      //  todoService.addTodoInfo($scope.expedia);
       $http.get('app/assets/files/test_files/todo_test.json')
       .success(function(data){
         $scope.expedia = data.thingsToDo;
       });
    }, function(error) {
        $http.get('app/assets/files/test_files/todo_test.json')
        .success(function(data){
          $scope.expedia = data.thingsToDo;
        });
    }).then(function(){
      Alchemy.save(travelInfo).$promise.then(function(news){
        //  $scope.alchemy = news.articles.result.docs;
        //  newsService.addNewsInfo($scope.alchemy);
         $http.get('app/assets/files/test_files/alchemy_test.json')
         .success(function(data){
           $scope.alchemy = data.articles.result.docs;
         });
      }, function(error) {
          $http.get('app/assets/files/test_files/alchemy_test.json')
          .success(function(data){
            $scope.alchemy = data.articles.result.docs;
          });
      }).then(function(){
        Instagram.save(travelInfo).$promise.then(function(tag){
          // $scope.instagram = tag.tags.data;
          // tagsService.addTagsInfo($scope.instagram);
          $http.get('app/assets/files/test_files/tags_test.json')
          .success(function(data){
            $scope.instagram = data.tags;
          });
        }, function(error) {
            $http.get('app/assets/files/test_files/tags_test.json')
            .success(function(data){
              $scope.instagram = data.tags;
            });
        }).then(function(){
          Weather.save(travelInfo).$promise.then(function(forecast){
          //  $scope.weather = forecast.weather;
          //  weatherService.addWeatherInfo($scope.weather);
           $http.get('app/assets/files/test_files/weather_test.json')
           .success(function(data){
             $scope.weather = data.weather;
           });
         }, function(error) {
             $http.get('app/assets/files/test_files/weather_test.json')
             .success(function(data){
               $scope.weather = data.weather;
             });
         }).then(function(){
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
.controller('TableCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){



}])
.controller('TodoCtrl', ['$scope', '$http', '$location', '$routeParams', 'travelInfoService', 'Expedia', 'Weather', 'ExpediaDetail', '$mdDialog', 'todoService', 'weatherService', function($scope, $http, $location, $routeParams, travelInfoService, Expedia, Weather, ExpediaDetail, $mdDialog, todoService, weatherService){

  // $scope.expedia = todoService.getTodoInfo();

  $http.get('app/assets/files/test_files/todo_test.json')
  .success(function(data){
    $scope.expedia = data.thingsToDo;
  });

  // $scope.weather = weatherService.getWeatherInfo();

  $http.get('app/assets/files/test_files/weather_test.json')
  .success(function(data){
    $scope.weather = data.weather;
  });

  $scope.travelInfo = travelInfoService.getTravelInfo();

  $scope.showDialog = showDialog;

  function showDialog($event, id) {
  var thisEvent = $event;
  //     ExpediaDetail.save({'id' : id}).$promise.then(function(data){
  //      $scope.expediaDetail = data.thingsToDoDetail;
  // console.log($scope.expediaDetail);

  //Todo detail test object//
  $http.get('app/assets/files/test_files/todo_detail_test.json')
  .success(function(data){
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
  console.log(travelInfoService.getTravelInfo());

  // $scope.alchemy = newsService.getNewsInfo();
  // console.log($scope.alchemy);

  $http.get('app/assets/files/test_files/alchemy_test.json')
  .success(function(data){
    $scope.alchemy = data.articles.result.docs;
  });

  // $scope.weather = weatherService.getWeatherInfo();
  // console.log(  $scope.weather);

  $http.get('app/assets/files/test_files/weather_test.json')
  .success(function(data){
    $scope.weather = data.weather;
  });

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
}]);
