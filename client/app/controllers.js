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
.controller('HomeCtrl', ['$scope', '$http', '$location', '$routeParams', 'travelInfoService', 'Expedia', 'todoService', 'Alchemy', 'newsService', 'Weather', 'weatherService', 'Instagram', 'tagsService', function($scope, $http, $location, $routeParams, travelInfoService, Expedia, todoService, Alchemy, newsService, Weather, weatherService, Instagram, tagsService){

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
    constructExpedia();
    constructAlchemy();
    constructInstagram();
    constructWeather();
    $location.path('/magazine');
  }
function constructExpedia(){
//Expedia api call and save to service//
  Expedia.save($scope.travelInfo).$promise.then(function(data){
     $scope.expedia = data.thingsToDo;
     todoService.addTodoInfo($scope.expedia);
  });
}

function constructAlchemy(){
  Alchemy.save($scope.travelInfo).$promise.then(function(data){
     $scope.alchemy = data.articles.result.docs;
     newsService.addNewsInfo($scope.alchemy);
  });
}

function constructInstagram(){
  Instagram.save($scope.travelInfo).$promise.then(function(data){
    $scope.instagram = data.tags.data;
    tagsService.addTagsInfo($scope.instagram);
  });
}

function constructWeather(){
  Weather.save($scope.travelInfo).$promise.then(function(data){
   $scope.weather = data.weather;
   weatherService.addWeatherInfo($scope.weather);
 });
}


}])
.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('green')
      .dark();
})
.controller('TodoCtrl', ['$scope', '$http', '$location', '$routeParams', 'travelInfoService', 'Alchemy', 'Expedia', 'Instagram', 'Weather', 'ExpediaDetail', '$mdDialog', 'todoService', function($scope, $http, $location, $routeParams, travelInfoService, Alchemy, Expedia, Instagram, Weather, ExpediaDetail, $mdDialog, todoService){

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
    console.log($scope.expediaDetail);

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
.controller('NewsCtrl', ['$scope', '$http', '$location', '$routeParams', 'Alchemy', 'travelInfoService', '$mdDialog', function($scope, $http, $location, $routeParams, Alchemy, travelInfoService, $mdDialog){

  $scope.travelInfo = travelInfoService.getTravelInfo();

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
