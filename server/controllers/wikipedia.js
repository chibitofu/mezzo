var express = require('express'),
    helper  = require('../helpers/wikipediaHelper.js'),
    router  = express.Router();

router.post('/', function(req, res){
  var location = req.body.city;

  if (location.indexOf(" ") >= 0) {
    location = location.split(" ");
    location = location.join('+');
    helper.wiki(location, function(wiki){
      res.send(wiki);
    });
  } else {
    helper.wiki(location, function(wiki){
      res.send(wiki);
    });
  }

});

module.exports = router;
