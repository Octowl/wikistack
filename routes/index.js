'use strict';
var express = require('express');
var router = express.Router();

module.exports = function makeRouterWithSockets(io, client) {
    router.get('/', function (req, res) {
        res.render('index', {});
    });

    return router;
}
