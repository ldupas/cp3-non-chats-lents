require('dotenv').config();
const connection = require('./db-config');
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/index.routes');

const port = process.env.PORT || 8000;

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log('connected as id ' + connection.threadId);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/api', router);
// defining the middleware
const middleware1 = (req, res, next) => {
  console.log('doing stuff in middleware 1');
};
// linking the middleware to the express app
app.use(middleware1);
app.get('/myroute', (req, res) => {
  console.log('handling /myroute');
  res.send('content for /myroute');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
// Please keep this module.exports app, we need it for the tests !
app.get('/', (req, res) => {
  res.send('Welcome on my checkpoint3');
});

module.exports = app;
