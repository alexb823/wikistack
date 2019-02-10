const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded())
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res)=> {
  res.send('Hello')
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
