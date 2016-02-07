var express = require('express'),
    request = require('request-promise');
var tagsFull = {'tags': []};

module.exports = {
  tags: function(tag, callback){
    var instagramApiStart = "https://api.instagram.com/v1/tags/";
    var tagName = tag;
    var count = "&count=100";
    var instagramApiEnd = "/media/recent"
    var apiKey = "?access_token=" + process.env.INSTAGRAM_ACCESS_TOKEN;

    var findTag = instagramApiStart + tagName + instagramApiEnd + apiKey + count;

    request(findTag, function(req, res){
      var tags= JSON.parse(res.body).data;
      for (var i = 0; i < tags.length; i++) {
        tagsFull.tags.push(tags[i]);
      }
    }).then(function(resultOne){
      var tags = JSON.parse(resultOne);
      var pagination = JSON.parse(resultOne).pagination;
      if (pagination) {
        request(pagination.next_url, function(req, res) {
          var tags = JSON.parse(res.body).data;
          for (var i = 0; i < tags.length; i++) {
            tagsFull.tags.push(tags[i]);
          }
        }).then(function(resultTwo){
          var tags = JSON.parse(resultTwo);
          var pagination = JSON.parse(resultTwo).pagination;
          if (pagination) {
            request(pagination.next_url, function(req, res) {
              var tags = JSON.parse(res.body).data;
              for (var i = 0; i < tags.length; i++) {
                tagsFull.tags.push(tags[i]);
              }
              callback({tagsFull: tagsFull})
            });
          }
        });
      }
    });
  }

};
