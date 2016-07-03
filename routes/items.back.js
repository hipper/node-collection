var express = require('express');

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded( {extended: false} );

// Redis connection
var redis = require("redis"),
    client = redis.createClient();

client.select((process.env.NODE_ENV || 'development').length);

client.hset('items', 'One', 'One description');
client.hset('items', 'Two', 'Two description');
client.hset('items', 'Three', 'Three description');
// End Redis Connection


var router = express.Router();

// Route /items
router.route('/')
    .get(function(req, res) {
        client.hkeys('items', function(error, keys) {
            if (error) throw error;
            res.json(keys);
        });
    })
    .post(urlencode, function(req, res) {
        var body = req.body;

        if (!body.name || !body.description) {
            res.sendStatus(400);
            return false;
        }

        client.hset('items', body.name, body.description, function(error) {
            if (error) throw error;
            res.status(201).json(body.name);
        });
    });

// Route /items/:name
router.route('/:name')
    .get(function(req, res) {
        client.hget('items', req.params.name, function(error, description) {
            if (error) throw error;
            res.render('show.ejs', {
                item: {
                    name: req.params.name,
                    description: description
                }
            });
        });
    })
    .delete(function(req, res) {
        client.hdel('items', req.params.name, function(error) {
            if (error) throw error;
            res.sendStatus(204);
        });
    });

module.exports = router;