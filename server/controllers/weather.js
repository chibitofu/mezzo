var express = require('express'),
    helper  = require('../helpers/weatherHelper.js'),
    router  = express.Router();

router.post('/', function(req, res){
  var location = req.body.city;
  var country = req.body.country;

  helper.forecast(location, country, function(forecast){
    res.send(forecast);
    console.log(forecast);
  });
});

module.exports = router;
