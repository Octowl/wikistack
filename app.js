'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var router = require('./routes');
var path = require('path');
var bodyParser = require('body-parser');
var Model = require('./models/');
// templating boilerplate setup
app.set('views', path.join(__dirname, '/views')); // where to find the views
app.set('view engine', 'html'); // what file extension do our templates have
app.engine('html', swig.renderFile); // how to render html templates
swig.setDefaults({
    cache: false
});

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({
    extended: true
})); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests


// start the server


//sync

Model.Page.sync({})
    .then(function () {
        return Model.User.sync();
    })
    .then(function () {
        var server = app.listen(1337, function () {
            console.log('listening on port 1337');
        });
    })
    .catch(console.error);
// modular routing that uses io inside it
app.use('/', router);

// the typical way to use express static middleware.
app.use(express.static(path.join(__dirname, '/public')));
