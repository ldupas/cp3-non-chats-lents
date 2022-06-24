const router = require("express").Router();
const connection = require("../db-config");

router.get("/", (req, res) => {
    connection.query("SELECT * FROM album",
    (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving from database")
        } else {
            res.json(result);
        }
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    connection.query("SELECT * FROM album WHERE id=?",
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