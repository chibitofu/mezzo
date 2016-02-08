var express = require('express'),
    request = require('request-promise'),
    geocoder  = require('geocoder');

module.exports = {

  places: function(lat, lng, keyword, callback){
    var placesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=";
    var lat = lat;
    var lng = "," + lng;
    var radius = "&radius=50000"
    var key = "&keyword=" + keyword;
    var apiKey = "&key=" + process.env.GOOGLE_PLACES_API_KEY;

    var findPlace = placesAPI + lat + lng + radius + key + apiKey;

    request(findPlace, function(req, res){
      var places = JSON.parse(res.body);
      callback({places: places})
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
