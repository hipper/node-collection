'use strict';

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded( {extended: false} );

var itemsController = require('../controllers/items');

/**
 *  Route /items
 */
router.route('/')
    .get(itemsController.getAll)
    .post(urlencode, itemsController.post);

// Route /items/:name
router.route('/:name')
    .get(itemsController.get)
    .delete(itemsController.remove);

module.exports = router;