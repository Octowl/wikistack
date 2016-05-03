'use strict';
var express = require('express');
var Page = require('../models').Page;
var User = require('../models').User;
var wikiRouter = express.Router();

wikiRouter.get('/', function (req, res) {
    res.redirect('/');
});

wikiRouter.post('/', function (req, res, next) {
    var title = req.body.title;
    var content = req.body.content;
    var name = req.body.name;
    var email = req.body.email;
    var status = req.body.status;
    var tags = req.body.tags.split(',').map(function (tag) {
        return tag.trim()
    });

    var page = Page.build({
        title: title,
        content: content,
        status: status,
        tags: tags
    });

    User.findOrCreate({
            where: {
                name: name,
                email: email
            }
        }).then(function (user) {
            return page.save().then(function (newPage) {
                return page.setAuthor(user[0]);
            })
        })
        .then(function (newPage) {
            res.redirect(newPage.route);
        })
        .catch(next);

})

wikiRouter.get('/add', function (req, res) {
    res.render('addpage', {});
})

wikiRouter.get('/search', function (req, res) {
    var tags = req.query.tags.split(',').map(function (tag) {
        return tag.trim()
    });
    Page.findByTag(tags).then(
        function (pages) {
            res.render('index', {
                pages: pages
            });
        }
    )
})

wikiRouter.get('/:urlTitle', function (req, res, next) {

    Page.findOne({
            where: {
                urlTitle: req.params.urlTitle
            },
            include: [{
                model: User,
                as: 'author'
            }]
        })
        .then(function (page) {
            if (page === null) {
                res.status(404).send();
            } else {
                res.render('wikipage', {
                    page: page
                })
            }
        }).catch(next);
});

module.exports = wikiRouter;
