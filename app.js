const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout');
const { db } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users')
const methodOverride = require('method-override');

const app = express();

app.use(morgan('dev'));

app.use(express.urlencoded());

app.use(methodOverride('_method'));

app.use(express.static(__dirname + '/public'));

app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

const port = process.env.PORT || 3000;

const initDb = (force = false) => {
  db.authenticate()
    .then(() => console.log('Connected to the database'))
    .then(() => db.sync({force}))
    .then(() => app.listen(port, () => console.log(`Listening on port ${port}`))) //For local matchine server
    // .then(() => app.listen(process.env.PORT, process.env.IP, () => console.log('Server has started'))) //For when using cloud 9 server
    .catch(error => console.error(error));
};


initDb();
