const express = require('express');
const userList = require("../views/userList");
const userPages = require("../views/userPages")
const { User, Page } = require("../models/index")

const router = express.Router();

router.get('/', (req, res, next) => {
    User.findAll()
    .then(users => res.send(userList(users)))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    let user;
    User.findById(req.params.id)
    .then(foundUser => {
        user = foundUser;
    })
    .then(() => Page.findAll({where: {authorId: req.params.id} }))
    .then(pages => res.send(userPages(user, pages)))
    .catch(next)
})

module.exports = router;
