'use strict';
var express = require('express');
var Page = require('../models').Page;
var wikiRouter = express.Router();

wikiRouter.get('/', function (req, res) {
    res.redirect('/');
});

wikiRouter.post('/', function (req, res, next) {
    var title = req.body.title;
    var content = req.body.content;
    var page = Page.build({
        title: title,
        content: content
    })
    page.save()
        .then(function (newPage) {
            res.redirect(newPage.route);
        }).catch(next);
})

wikiRouter.get('/add', function (req, res) {
    res.render('addpage', {});
})

wikiRouter.get('/:urlTitle', function (req, res, next) {

    Page.findOne({
            where: {
                urlTitle: req.params.urlTitle
            }
        })
        .then(
            function (result) {
                res.render('wikipage', {
                    page: result
                });
            }
        ).catch(next);
});

module.exports = wikiRouter;
