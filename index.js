var express     = require('express'),
    dotenv      = require('dotenv').config(),
    request     = require('request-promise'),
    bodyParser  = require('body-parser'),
    path        = require('path'),
    geocoder    = require('geocoder'),

    app         = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/expedia',
  require('./server/controllers/expedia'));
app.use('/api/instagram',
  require('./server/controllers/instagram'));
app.use('/api/weather',
  require('./server/controllers/weather'));
app.use('/api/alchemy',
  require('./server/controllers/alchemy'));
app.use('/api/times',
  require('./server/controllers/times'));
app.use('/api/wiki',
  require('./server/controllers/wikipedia'));
app.use('/api/places',
  require('./server/controllers/places'))

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.listen(process.env.PORT || 3000);
