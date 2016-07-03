'use strict';

var itemsModel = require('../models/items');

/**
 *  Get our items
 */
exports.getAll = function(req, res, next) {
    itemsModel.getAll(function(err, data) {
        res.status(err ? 503 : 200).json({
            error: err ? true : null,
            errorMessage: err ? err : null,
            data: data
        });
    });
};

/**
 *  Get a single item
 */
exports.get = function(req, res, next) {
    itemsModel.get(req.params.name, function(err, data) {
        if (err) return res.status(503).json({error: err});

        res.render('show.ejs', {
            item: {
                name: req.params.name,
                description: data
            }
        });
    });
};

/**
 *  Post item
 */
exports.post = function(req, res, next) {
    var body = req.body;

    if (!body.name || !body.description) {
        res.sendStatus(400);
        return false;
    }

    itemsModel.save(body, function(err, data) {
        res.status(err ? 503 : 201).json({
            error: err ? true : null,
            errorMessage: err ? err : null,
            data: data.name
        });
    });
};

/**
 *  Remove item
 */
exports.remove = function(req, res, next) {
    itemsModel.remove(req.params.name, function(err, data) {
        if (err) return res.status(503).json({error: err});
        res.sendStatus(204);
    });
};