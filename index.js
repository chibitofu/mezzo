var express     = require('express'),
    dotenv      = require('dotenv').config(),
    request     = require('request'),
    bodyParser  = require('body-parser'),
    expedia     = require('expedia'),
    instagram   = require('instagram'),
    alchemy     = require('alchemy-api'),
    path        = require('path'),

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

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.listen(process.env.PORT || 3000);
