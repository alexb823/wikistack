const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout');
const { db } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user')

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send(layout('hello world'));
});

const port = process.env.PORT || 3000;

const initDb = (force = false) => {
  db.authenticate()
    .then(() => console.log('Connected to the database'))
    .then(() => db.sync({force}))
    .then(() => app.listen(port, () => console.log(`Listening on port ${port}`)))
    .catch(error => console.error(error));
};

initDb(true);
