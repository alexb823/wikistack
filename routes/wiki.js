const express = require('express');
const addPage = require('../views/addPage')
const layout = require('../views/layout')
const wikipage = require('../views/wikipage')
const { Page, findPage } = require("../models/index")

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send(layout());
});

router.post('/', (req, res, next) => {
  // res.json(req.body);
  const page = new Page({
    title: req.body.title,

    content: req.body.pageContent,
    status: req.body.pageStatus
  })
  page.save()
  .then(() => console.log(page.slug))
  .then(() => res.redirect(`${page.slug}`))
  .catch(next);
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', (req, res, next) => {
  findPage(req.params.slug)
  .then((page)=> {
    if(!page) res.sendStatus(404);
    else res.send(wikipage(page));
  })
  .catch(next)
})

module.exports = router;
