var express = require('express'),
    request = require('request');

module.exports = {

  thingsToDo: function(loc, start, end, callback){
    var expediaAPI = "http://terminal2.expedia.com:80/x/activities/search?";
    var location = "location=" + loc;
    var startDate = "&startDate=" + start;
    var endDate = "&endDate=" + end;
    var apiKey = "&apikey=" + process.env.EXPEDIA_CONSUMER_KEY;

    var findToDo = expediaAPI + location + startDate + endDate + apiKey;

    request(findToDo, function(req, res){
      var thingsToDo = JSON.parse(res.body).activities;
      callback({thingsToDo: thingsToDo})
    });
  }


};
