var express = require('express'),
    request = require('request');

module.exports = {
  times: function(query, callback){
    var timesApi = "http://api.nytimes.com/svc/search/v2/articlesearch.json?";
    var q = "q=" + query;
    var filter = "&page=2&sort=oldest"
    var apiKey = "&api-key=" + process.env.TIMES_API_KEY;

    var findTimes = timesApi + q + filter + apiKey;

    request(findTimes, function(req, res){
      var articles = JSON.parse(res.body);
      callback({articles: articles})
    });
  }

};
