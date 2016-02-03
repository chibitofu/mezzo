var express = require('express'),
    request = require('request');

module.exports = {
  articles: function(keyword, callback){
    var alchemyApiStart = "https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=20&q.enriched.url.enrichedTitle.keywords.keyword.text=";
    var key = keyword;
    var alchemyApiEnd = "&return=enriched.url.url,enriched.url.title,enriched.url.text,enriched.url.image";
    var apiKey = "&apikey=" + process.env.ALCHEMY_API_KEY;

    var findArticles = alchemyApiStart + key + alchemyApiEnd + apiKey;

    request(findArticles, function(req, res){
      var articles = JSON.parse(res.body);
      callback({articles: articles})
    });
  },

  text: function(url, callback){
    var alchemyTextApi = "http://gateway-a.watsonplatform.net/calls/url/URLGetText?";
    var uri = "&url=" + url;
    var apiKey = "apikey=" + process.env.ALCHEMY_API_KEY;
    var output = "&outputMode=json";

    var findText = alchemyTextApi + apiKey + uri + output;

    request(findText, function(req, res){
      var text = JSON.parse(res.body);
      callback({text: text})
    });
  }

};
