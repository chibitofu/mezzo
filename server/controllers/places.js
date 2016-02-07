var express = require('express'),
    helper  = require('../helpers/placesHelper.js'),
    places  = require('googleplaces'),
    router  = express.Router();

router.post('/restaurants', function(req, res){
  var lat = req.body.lat;
  var lng = req.body.lng;

  helper.restaurants(lat, lng, function(restaurants){
    res.send(restaurants);
  });
});

router.post('/geocode', function(req, res){
  var location = req.body.city;
  var country = req.body.country;

  helper.geocode(location, country, function(geocode){
    res.send(geocode);
  });
});

module.exports = router;
