var express = require('express'),
    helper  = require('../helpers/wikipediaHelper.js'),
    router  = express.Router();

router.post('/', function(req, res){
  var location = req.body.city;

  helper.wiki(location, function(wiki){
    res.send(wiki);
  });
});

module.exports = router;
