require('dotenv').config();
const express = require('express');
const connection = require("./db-config");
const router = require("./routes/index.routes");

const app = express();
const port = process.env.PORT || 8000;

connection.connect((err) => {
    if (err) {
        console.log("error connecting to database " + process.env.DB_NAME + " error: " + err.stack);
    } else {
        console.log("connected to database " + process.env.DB_NAME + " as id: " + connection.threadId);
    }
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api", router);

app.get("/", (req,res) => {
    res.send("Welcome to the CP3 albums API");
});

// Please keep this module.exports app, we need it for the tests !
module.exports = app;
