'use strict';

var redis = require('../lib/redis');

/**
 * Initial data
 */
redis.hset('items', 'One', 'One description');
redis.hset('items', 'Two', 'Two description');
redis.hset('items', 'Three', 'Three description');

/**
 *  Load most recent items from the database
 */
exports.getAll = function(callback) {
    redis.hkeys('items', function(error, data) {
        if (error) return callback(error, null);
        callback(null, data);
    });
};

/**
 *  Get a single item
 */
exports.get = function(item, callback) {
    redis.hget('items', item, function(error, description) {
        if (error) return callback(error, null);
        callback(null, description);
    });
};

/**
 *  Save item to the database
 */
exports.save = function(item, callback) {
    redis.hset('items', item.name, item.description, function(error, reply) {
        if (error) return callback(error, null);
        callback(null, item);
    });
};

/**
 *  Remove item from the database
 */
exports.remove = function(item, callback) {
    redis.hdel('items', item, function(error) {
        if (error) callback(error, null);
        callback(null, item);
    });
};