var express = require('express'),
    helper  = require('../helpers/instagramHelper.js'),
    router  = express.Router();

router.post('/', function(req, res){
  var tag = req.body.tag;

  helper.tags(tag, function(tag){
    res.send(tag);
    console.log(tag);
  });
});

module.exports = router;
