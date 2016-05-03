'use strict';
var express = require('express');
var Promise = require('bluebird');

var Page = require('../models').Page;
var User = require('../models').User;

var usersRouter = express.Router();

usersRouter.get('/', function (req, res, next) {
    User.findAll().then(
        function (users) {
            res.render('users', {
                users: users
            });
        });
});

usersRouter.get('/:id', function (req, res, next) {
    var id = req.params.id

    var userPromise = User.findById(id)

    var pagesPromise = Page.findAll({
        where: {
            authorId: id
        }
    })

    Promise.all([userPromise, pagesPromise]).then(
        function (values) {
            var user = values[0];
            var pages = values[1];
            res.render('userpage', {
                user: user,
                pages: pages
            });
        }
    ).catch(next);
});
module.exports = usersRouter;
