var express = require('express'),
    request = require('request');

module.exports = {
  wiki: function(city, callback){
    var wikiStart = " https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&titles=";
    var wikiCity = city;
    var wikiEnd = "&redirects=";

    var findWiki = wikiStart + wikiCity + wikiEnd;

    request(findWiki, function(req, res){
      var wiki = JSON.parse(res.body);
      callback({wiki: wiki})
    });
  }

};
