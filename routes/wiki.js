const express = require('express');
const addPage = require('../views/addPage')
const { Page } = require("../models/index")

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('got to GET /wiki/');
});

router.post('/', (req, res, next) => {
  // res.json(req.body);
  const page = new Page({
    title: req.body.title,
    content: req.body.pageContent
  })
  
  page.save()
  .then(() => res.redirect('/'))
  .catch(next);
});


router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
