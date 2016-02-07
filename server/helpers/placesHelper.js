var express = require('express'),
    request = require('request-promise'),
    geocoder  = require('geocoder');

module.exports = {

  restaurants: function(lat, lng, callback){
    var placesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=";
    var lat = lat;
    var lng = "," + lng;
    var radius = "&radius=50000"
    var keyword = "&keyword=restaurant"
    var apiKey = "&key=" + process.env.GOOGLE_PLACES_API_KEY;

    var findRestaurant = placesAPI + lat + lng + radius + keyword + apiKey;

    request(findRestaurant, function(req, res){
      var restaurants = JSON.parse(res.body);
      callback({restaurants: restaurants})
    });
  },

  geocode: function(location, country, callback){
    var loc = location + "," + country;
    geocoder.geocode(loc, function ( err, data ) {
        var geoLocation = data;
        callback({geoLocation: geoLocation})
    });
  }

};
