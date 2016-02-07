var express = require('express'),
    request = require('request-promise');

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
  },
  thingsToDoDetail: function(id, callback){
    var expediaAPI = "http://terminal2.expedia.com:80/x/activities/details?"
    var id = "activityId=" + id;
    var apiKey = "&apikey=" + process.env.EXPEDIA_CONSUMER_KEY;

    var findToDoDetail = expediaAPI + id + apiKey;

    request(findToDoDetail, function(req, res){
      var thingsToDoDetail = JSON.parse(res.body);
      callback({thingsToDoDetail: thingsToDoDetail})
    });
  }

};
