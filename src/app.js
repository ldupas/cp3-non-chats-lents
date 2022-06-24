require('dotenv').config();
const connection = require('../db-config');
const express = require('express');

const app = express();

const router = require('../routes/index.routes');

const port = process.env.PORT || 8000;

connection.connect((err) => {
  if (err) {
    console.error('error connecting:' + err.stack);
  } else {
    console.log('connected as id' + connection.threadID);
  }
});

app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('welcome!!!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Please keep this module.exports app, we need it for the tests !
module.exports = app;
