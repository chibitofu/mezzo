angular.module('MezzoServices', ['ngResource'])
.factory('Alchemy', ['$resource', function($resource){
  return $resource('http://localhost:3000/api/alchemy');
}])
.factory('Expedia', ['$resource', function($resource){
  return $resource('http://localhost:3000/api/expedia');
}])
.factory('ExpediaDetail', ['$resource', function($resource){
  return $resource('http://localhost:3000/api/expedia/detail');
}])
.factory('Instagram', ['$resource', function($resource){
  return $resource('http://localhost:3000/api/instagram');
}])
.factory('Weather', ['$resource', function($resource){
  return $resource('http://localhost:3000/api/weather');
}])
.factory('travelInfoService', function(){
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

})
.factory('todoService', function(){
  var todoInfo = {};

  var addTodoInfo = function(info){
    todoInfo = info;
  }

  var getTodoInfo = function(){
    return todoInfo;
  }

  return {
    addTodoInfo: addTodoInfo,
    getTodoInfo: getTodoInfo
  };
})
.factory('newsService', function(){
  var newsInfo = {};

  var addNewsInfo = function(info){
    newsInfo = info;
  }

  var getNewsInfo = function(){
    return newsInfo;
  }

  return {
    addNewsInfo: addNewsInfo,
    getNewsInfo: getNewsInfo
  };
})
.factory('weatherService', function(){
  var weatherInfo = {};

  var addWeatherInfo = function(info){
    weatherInfo = info;
  }

  var getWeatherInfo = function(){
    return weatherInfo;
  }

  return {
    addWeatherInfo: addWeatherInfo,
    getWeatherInfo: getWeatherInfo
  };
})
.factory('tagsService', function(){
  var tagsInfo = {};

  var addTagsInfo = function(info){
    tagsInfo = info;
  }

  var getTagsInfo = function(){
    return tagsInfo;
  }

  return {
    addTagsInfo: addTagsInfo,
    getTagsInfo: getTagsInfo
  };
});
