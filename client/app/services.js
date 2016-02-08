angular.module('MezzoServices', ['ngResource'])
.factory('Alchemy', ['$resource', function($resource){
  return $resource('https://mezzo-travel.herokuapp.com/api/alchemy');
}])
.factory('Expedia', ['$resource', function($resource){
  return $resource('https://mezzo-travel.herokuapp.com/api/expedia');
}])
.factory('ExpediaDetail', ['$resource', function($resource){
  return $resource('https://mezzo-travel.herokuapp.com/api/expedia/detail');
}])
.factory('Instagram', ['$resource', function($resource){
  return $resource('https://mezzo-travel.herokuapp.com/api/instagram');
}])
.factory('Weather', ['$resource', function($resource){
  return $resource('https://mezzo-travel.herokuapp.com/api/weather');
}])
.factory('Wiki', ['$resource', function($resource){
  return $resource('https://mezzo-travel.herokuapp.com/api/wiki');
}])
.factory('Places', ['$resource', function($resource){
  return $resource('https://mezzo-travel.herokuapp.com/api/places');
}])
.factory('Geocode', ['$resource', function($resource){
  return $resource('https://mezzo-travel.herokuapp.com//api/places/geocode');
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

})
.factory('wikiService', function(){
  var wikiInfo = {};

  var addWikiInfo = function(info){
    wikiInfo = info;
  }

  var getWikiInfo = function(){
    return wikiInfo;
  }

  return {
    addWikiInfo: addWikiInfo,
    getWikiInfo: getWikiInfo
  };
})
.factory('restaurantService', function(){
  var restaurantInfo = {};

  var addRestaurantInfo = function(info){
    restaurantInfo = info;
  }

  var getRestaurantInfo = function(){
    return restaurantInfo;
  }

  return {
    addRestaurantInfo: addRestaurantInfo,
    getRestaurantInfo: getRestaurantInfo
  };
})
.factory('geocodeService', function(){
  var geocodeInfo = {};

  var addGeocodeInfo = function(info){
    geocodeInfo = info;
  }

  var getGeocodeInfo = function(){
    return geocodeInfo;
  }

  return {
    addGeocodeInfo: addGeocodeInfo,
    getGeocodeInfo: getGeocodeInfo
  };
})
.factory('hotelService', function(){
  var hotelInfo = {};

  var addHotelInfo = function(info){
    hotelInfo = info;
  }

  var getHotelInfo = function(){
    return hotelInfo;
  }

  return {
    addHotelInfo: addHotelInfo,
    getHotelInfo: getHotelInfo
  };
});
