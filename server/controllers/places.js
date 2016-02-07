var express = require('express'),
    helper  = require('../helpers/placesHelper.js'),
    router  = express.Router();

router.post('/restaurants', function(req, res){
  var lat = req.body.lat;
  var lng = req.body.lng;
  helper.restaurants(lat, lng, function(restaurants){
    res.send(restaurants);
  });
});

router.post('/geocode', function(req, res){
  var city = req.body.city;
  var country  = req.body.country;

  helper.geocode(city, country, function(geocode){
    res.send(geocode);
  });
});

module.exports = router;
