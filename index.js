var express     = require('express'),
    request     = require('request'),
    bodyParser  = require('body-parser'),
    expedia     = require('expedia'),
    instagram   = require('instagram'),
    alchemy     = require('alchemy-api'),
    dotEnv      = require('dot-env'),
    path        = require('path'),

    app         = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.listen(process.env.PORT || 3000);
