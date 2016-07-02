var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded( {extended: false} );

app.use(express.static('public'));

var redis = require("redis"),
    client = redis.createClient();

client.select((process.env.NODE_ENV || 'development').length);

client.hset('items', 'One', 'One description');
client.hset('items', 'Two', 'Two description');
client.hset('items', 'Three', 'Three description');

app.get('/items', function(req, res) {
    client.hkeys('items', function(error, keys) {
        if (error) throw error;
        res.json(keys);
    });
});

app.post('/items', urlencode, function(req, res) {
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

app.get('/items/:name', function(req, res) {
    client.hget('items', req.params.name, function(error, description) {
        if (error) throw error;
        res.render('show.ejs', {
            item: {
                name: req.params.name,
                description: description
            }
        });
    });
});

app.delete('/items/:name', function(req, res) {
    client.hdel('items', req.params.name, function(error) {
        if (error) throw error;
        res.sendStatus(204);
    });
});

module.exports = app;