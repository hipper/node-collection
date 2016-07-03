var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var items = require('./routes/items');
app.use('/items', items);

module.exports = app;