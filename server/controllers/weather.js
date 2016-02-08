var express = require('express'),
    helper  = require('../helpers/weatherHelper.js'),
    router  = express.Router();

router.post('/', function(req, res){
  var location = req.body.city;
  var country = req.body.country;

  if (location.indexOf(" ") >= 0) {
    location = location.split(" ");
    location = location.join('+');
    helper.forecast(location, country, function(forecast){
      res.send(forecast);
    });
  } else {
    helper.forecast(location, country, function(forecast){
      res.send(forecast);
    });
  }

});

module.exports = router;
