var express   = require('express'),
    request   = require('request-promise'),
    tagsFull  = {'tags': []};

module.exports = {
  tags: function(tag, callback){

    var instagramApiStart = "https://api.instagram.com/v1/tags/";
    var tagName = tag;
    var count = "&count=66";
    var instagramApiEnd = "/media/recent"
    var apiKey = "?access_token=" + process.env.INSTAGRAM_ACCESS_TOKEN;

    var findTag = instagramApiStart + tagName + instagramApiEnd + apiKey + count;

    // request(findTag, function(req, res){
    //   var tags = JSON.parse(res.body);
    //   console.log(tags);
    //   callback({tags: tags})
    // });

    request(findTag, function(req, res){
      var tags= JSON.parse(res.body).data;
      for (var i = 0; i < tags.length; i++) {
        tagsFull.tags.push(tags[i]);
      }
    }).then(function(resultOne){
      var tags = JSON.parse(resultOne);
      if (JSON.parse(resultOne).pagination) {
        var pagination = JSON.parse(resultOne).pagination;
        request(pagination.next_url, function(req, res) {
          var tags = JSON.parse(res.body).data;
          for (var i = 0; i < tags.length; i++) {
            tagsFull.tags.push(tags[i]);
          }
        }).then(function(resultTwo){
          var tags = JSON.parse(resultTwo);
          if (JSON.parse(resultTwo).pagination) {
            var pagination = JSON.parse(resultTwo).pagination;
            request(pagination.next_url, function(req, res) {
              var tags = JSON.parse(res.body).data;
              for (var i = 0; i < tags.length; i++) {
                tagsFull.tags.push(tags[i]);
              }
              callback({tagsFull: tagsFull})
            });
          } else {
            callback({tagsFull: tagsFull})
          }
        });
      } else {
        callback({tagsFull: tagsFull})
      }
    });
  }

};
