'use strict';
var express = require('express');
var Page = require('../models').Page;
var User = require('../models').User;

var usersRouter = express.Router();

usersRouter.get('/', function(req, res, next){
    User.findAll().then(
        function(users){
            res.render('users', {users: users});
        });
});

usersRouter.get('/:id', function(req, res, next){
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(
        function(user){
            res.render('userpage', {user: user});
        }
    )
});
module.exports = usersRouter;
