'use strict';

var express = require('express');
var app = express();

var itemsRoute = require('./routes/items');

/**
 * Serve static files
 */
app.use(express.static(__dirname + '/public'));

/**
 * Serve /items routes
 */
app.use('/items', itemsRoute);

/** This used to be able to run app using ./bin/www command and for the tests */
module.exports = app;