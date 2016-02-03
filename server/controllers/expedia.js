var express = require('express'),
    helper  = require('../helpers/expediaHelper.js'),
    router  = express.Router();

router.post('/', function(req, res){
  var location = req.body.location;
  var startDate = req.body.start;
  var endDate = req.body.end;

  helper.thingsToDo(location, startDate, endDate, function(thingsToDo){
    res.send(thingsToDo);
    console.log(thingsToDo);
  });
});

module.exports = router;
