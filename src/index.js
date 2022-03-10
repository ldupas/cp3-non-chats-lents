const connection = require('../db-config');
const express = require('express');
const cors = require('cors');
const router = require('./routes/index.route');
const app = require('./app');

const PORT = process.env.PORT || 8000;

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log('connected as id ' + connection.threadId);
  }
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors())
app.use('/api', router);

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.listen(PORT, (err) => {
  // eslint-disable-next-line no-console
  if (err) console.error(err);
  // eslint-disable-next-line no-console
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
