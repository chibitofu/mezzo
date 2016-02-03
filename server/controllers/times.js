var express = require('express'),
    helper  = require('../helpers/timesHelper.js'),
    router  = express.Router();

router.post('/', function(req, res){
  var query = req.body.q;

  helper.times(query, function(articles){
    res.send(articles);
    console.log(articles);
  });
});

module.exports = router;
