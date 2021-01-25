require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 



app.listen('9000', '0.0.0.0', function () {
    console.log('Express server listening on %d, in %s mode', '9000', app.get('env'));
});