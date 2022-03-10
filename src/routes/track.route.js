const connection = require("../../db-config");
const router = require("express").Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM track', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving track from database');
      } else {
        res.json(result);
      }
    });
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
        else res.status(404).send('track not found');
      }
    }
  );
});

router.get('/track', (req, res) => {
  const trackId = req.params.id;
  connection.query(
    'SELECT * FROM track INNER JOIN album ON album.id = track.album_id WHERE track.id = ?',
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
router.post('/', (req, res) => {
  const { track_title, youtube_url, album} = req.body;
  connection.query(
    'INSERT INTO track (track_title, youtube_url, album) VALUES (?, ?, ?)',
    [track_title, youtube_url, album],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving the track');
      } else {
        const id = result.insertId;
        const createdTrack = { id, track_title, youtube_url, album};
        res.status(201).json(createdTrack);
      }
    }
  );
});

router.put('/:id', (req, res) => {
  const trackId = req.params.id;
  const db = connection.promise();
  let existingTrack = null;
  db.query('SELECT * FROM track WHERE id = ?', [trackId])
    .then(([results]) => {
      existingTrack = results[0];
      if (!existingTrack) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE track SET ? WHERE id = ?', [req.body, trackId]);
    })
    .then(() => {
      res.status(200).json({ ...existingTrack, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`track with id ${trackId} not found.`);
      else res.status(500).send('Error updating a track');
    });
});

router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM track WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting a track');
      } else {
        if (result.affectedRows) res.status(200).send('🎉 track deleted!');
        else res.status(404).send('track not found.');
      }
    }
  );
});

module.exports = router;