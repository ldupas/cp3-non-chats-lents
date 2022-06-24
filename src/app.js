require('dotenv').config();
const express = require('express');

const router=require('./routes/index.routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(('/api',router));
// Please keep this module.exports app, we need it for the tests !
module.exports = app;
