var express = require('express'),
    helper  = require('../helpers/instagramHelper.js'),
    router  = express.Router();

router.post('/', function(req, res){
  var tag = req.body.city;
    tag = tag.split(" ");
    tag = tag.join('');
    helper.tags(tag, function(tag){
      res.send(tag.tagsFull);
    });

});

module.exports = router;
