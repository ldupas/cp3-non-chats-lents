const router = require("express").Router();
const connection = require("../db-config");

router.get("/", (req, res) => {
    connection.query("SELECT * FROM track",
    (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error while retrieving from database")
        } else {
            res.json(result);
        }
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    connection.query("SELECT * FROM track WHERE id=?",
    [id],
    (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error while retrieving from database");
        } else {
            res.json(result);
        }
    });
});

router.get("/albumtracks/:id", (req, res) => {
    const id = req.params.id;
    connection.query("SELECT * FROM track WHERE id_album=?",
    [id],
    (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error while retrieving from database");
        } else {
            res.json(result);
        }
    });
});

module.exports = router;