var express = require('express'),
    request = require('request');

module.exports = {
  tags: function(tag, callback){
    var instagramApiStart = "https://api.instagram.com/v1/tags/";
    var tagName = tag;
    var count = "&count=100";
    var instagramApiEnd = "/media/recent"
    var apiKey = "?access_token=" + process.env.INSTAGRAM_ACCESS_TOKEN;

    var findTag = instagramApiStart + tagName + instagramApiEnd + apiKey + count;

    console.log(findTag);

    request(findTag, function(req, res){
      var tags = JSON.parse(res.body);
      callback({tags: tags})
    });
  }

};
