angular.module('MezzoServices', ['ngResource'])
.factory('Alchemy', ['$resource', function($resource){
  return $resource('http://localhost:3000/api/alchemy');
}])
.factory('Expedia', ['$resource', function($resource){
  return $resource('http://localhost:3000/api/expedia');
}])
.factory('Instagram', ['$resource', function($resource){
  return $resource('http://localhost:3000/api/instagram');
}])
.factory('Weather', ['$resource', function($resource){
  return $resource('http://localhost:3000/api/weather');
}])
.service('travelInfoService', function(){
  var travelInfo = {};

  var addTravelInfo = function(info){
    travelInfo = info;
  }

  var getTravelInfo = function(){
    return travelInfo;
  }

  return {
    addTravelInfo: addTravelInfo,
    getTravelInfo: getTravelInfo
  };

});
