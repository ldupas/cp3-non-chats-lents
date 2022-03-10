const router = require('express').Router();
const connection = require('../../db-config');

router.get('/', (req, res) => {
    connection.query("SELECT * FROM track", (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving track from database');
        } else {
            res.json(result);
        }
    })
});

router.get('/:id', (req, res) => {
    const trackId = req.params.id;
    connection.query(
        'SELECT * FROM track WHERE id = ?',
        [trackId],
        (err, results) => {
            if (err) {
                res.status(500).send('Error retrieving track from database');
            } else {
                if (results.length) res.json(results[0]);
                else res.status(404).send('Track not found');
            }
        }
    );
});

module.exports = router;