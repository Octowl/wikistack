'use strict';
var express = require('express');
var Page = require('../models').Page;
var wikiRouter = express.Router();

wikiRouter.get('/', function (req, res) {
    res.redirect('/');
});

wikiRouter.post('/', function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var page = Page.build({
        title: title,
        content: content
    })
    page.save()
    .then(function () {
        res.redirect('/');
    });
})

wikiRouter.get('/add', function (req, res) {
    res.render('addpage', {});
})

module.exports = wikiRouter;
