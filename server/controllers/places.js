var express = require('express'),
    helper  = require('../helpers/placesHelper.js'),
    router  = express.Router();

router.post('/', function(req, res){
  var lat     = req.body.lat;
  var lng     = req.body.lng;
  var keyword = req.body.keyword;
  helper.places(lat, lng, keyword, function(places){
    res.send(places);
  });
});

router.post('/geocode', function(req, res){
  var city     = req.body.city;
  var country  = req.body.country;

  helper.geocode(city, country, function(geocode){
    res.send(geocode);
  });
});

module.exports = router;
