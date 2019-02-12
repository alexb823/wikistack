const express = require('express');
const addPage = require('../views/addPage')
const layout = require('../views/layout')
const main = require("../views/main")
const wikipage = require('../views/wikipage')
const { Page, findPage, findOrCreatUse } = require("../models/index")

const router = express.Router();

router.get('/', (req, res, next) => {
  Page.findAll()
    .then((pages) => res.send(main(pages)))
    .catch(next);
});


router.post('/', (req, res, next) => {
  let user;
  findOrCreatUse(req.body.authorName, req.body.authorEamil)
    .then((aUser) => {
      user = aUser;
      return new Page({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status
      });
    })
    .then(page => page.save())
    .then(page => page.setAuthor(user))
    .then((page) => res.redirect(`/wiki/${page.slug}`))
    .catch(next);
});


router.get('/add', (req, res, next) => {
  res.send(addPage());
});


router.get('/:slug', (req, res, next) => {
  let currentPage;
  findPage(req.params.slug)
    .then((page) => {
      if (!page) res.sendStatus(404);
      else {
        currentPage = page;
        return page.getAuthor();
      }
    })
    .then(author => res.send(wikipage(currentPage, author)))
    .catch(next)
})

module.exports = router;
