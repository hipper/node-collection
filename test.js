'use strict';

var app = require('./app');

var request = require('supertest');
var redis = require('redis');
var client = redis.createClient();

client.select('test'.length);
client.flushdb();

describe('Requests to the root path', function() {

    it('Returns a 200 status code', function(done) {
        request(app)
            .get('/')
            .expect(200, done);
    });

    it('Returns a HTML format', function(done) {
        request(app)
            .get('/')
            .expect('Content-Type', /html/, done);
    });

});

describe('Listing items on /items', function() {

    it('Returns 200 status code', function(done){
        request(app)
            .get('/items')
            .expect(200, done);
    });

    it('Returns JSON format', function(done) {
        request(app)
            .get('/items')
            .expect('Content-Type', /json/, done);
    });

});

describe('Creating new items', function() {

    it('Returns a 201 status code', function(done){
        request(app)
            .post('/items')
            .send('name=Item&description=item+description+goes+here')
            .expect(201, done);
    });

    it('Return the item name', function(done) {
        request(app)
            .post('/items')
            .send('name=Item&description=item+description+goes+here')
            .expect(/Item/i, done);
    });

    it('Validates submitted name and description', function(done) {
        request(app)
            .post('/items')
            .send('name=&description=')
            .expect(400, done);
    });

});

describe('Deleting items', function() {

    before(function() {
        client.hset('items', 'Banana', 'a tasty fruit');
    });

    after(function() {
        client.flushdb();
    });

    it('Returns 204 status code', function(done) {
        request(app)
            .delete('/items/Banana')
            .expect(204, done);
    });

});

describe('Single item info', function() {

    before(function() {
        client.hset('items', 'Banana', 'a tasty fruit');
    });

    after(function() {
        client.flushdb();
    });

    it('Returns 200 status code', function(done) {
        request(app)
            .get('/items/Banana')
            .expect(200, done);
    });

    it('Returns description for given item', function(done) {
        request(app)
            .get('/items/Banana')
            .expect(/tasty/, done);
    });

    it('Returns HTML format', function(done) {
        request(app)
            .get('/items/Banana')
            .expect('Content-Type', /html/, done);
    });

});

