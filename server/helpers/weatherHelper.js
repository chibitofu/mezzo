var express = require('express'),
    request = require('request');

module.exports = {
  forecast: function(loc, cnt, callback){
    var weatherApi = "http://api.openweathermap.org/data/2.5/forecast";
    var location = "?q=" + loc;
    var country = "," + cnt;
    var mode = "&mode=json";
    var apiKey = "&APPID=" + process.env.OPEN_WEATHER_API_KEY;

    var getWeather = weatherApi + location + country + mode + apiKey;

    request(getWeather, function(req, res){
      var weather = JSON.parse(res.body);
      callback({weather: weather})
    });
  }

};
