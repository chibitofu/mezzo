var express = require('express'),
    helper  = require('../helpers/expediaHelper.js'),
    router  = express.Router();

router.post('/', function(req, res){
  var location = req.body.city;
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;

  if (location.indexOf(" ") >= 0) {
    location = location.split(" ");
    location = location.join('+');
    helper.thingsToDo(location, startDate, endDate, function(thingsToDo){
      res.send(thingsToDo);
    });
  } else {
    helper.thingsToDo(location, startDate, endDate, function(thingsToDo){
      res.send(thingsToDo);
    });
  }

});

router.post('/detail', function(req, res){
  var id = req.body.id;

  helper.thingsToDoDetail(id, function(thingsToDoDetail){
    res.send(thingsToDoDetail);
  });
});

module.exports = router;
