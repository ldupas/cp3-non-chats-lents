const router = require('express').Router();
const connection = require('../../db-config');

router.get('/', (req, res) => {
    connection.query("SELECT * FROM album", (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving album from database');
        } else {
            res.json(result);
        }
    })
});

router.get('/:id', (req, res) => {
    const albumId = req.params.id;
    connection.query(
        'SELECT * FROM album WHERE id = ?',
        [albumId],
        (err, results) => {
            if (err) {
                res.status(500).send('Error retrieving album from database');
            } else {
                if (results.length) res.json(results[0]);
                else res.status(404).send('Album not found');
            }
        }
    );
});

module.exports = router;