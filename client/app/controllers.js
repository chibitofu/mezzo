angular.module('MezzoCtrls', ['ngMaterial', 'ngRoute', 'MezzoServices'])
.controller('HomeCtrl', ['$scope', '$http', '$location', '$routeParams', 'travelInfoService', function($scope, $http, $location, $routeParams, travelInfoService){

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

    $location.path('/magazine');
  }

}])
.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('green')
      .dark();
})
.controller('MagazineCtrl', ['$scope', '$http', '$location', '$routeParams', 'travelInfoService', 'Alchemy', function($scope, $http, $location, $routeParams, travelInfoService, Alchemy){

  $scope.travelInfo = travelInfoService.getTravelInfo();

  $scope.alchemy = new Alchemy($scope.travelInfo);
  $scope.alchemy.$save();
  console.log(alchemy);

}]);
