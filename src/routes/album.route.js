const connection = require("../../db-config");
const router = require("express").Router();


router.get('/', (req, res) => {
    connection.query('SELECT * FROM album', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving Album from database');
      } else {
        res.json(result);
      }
    });
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

router.post('/', (req, res) => {
  const { title, genre, picture, artist} = req.body;
  connection.query(
    'INSERT INTO album (title, genre, picture, artist) VALUES (?, ?, ?, ?)',
    [title, genre, picture, artist],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving the album');
      } else {
        const id = result.insertId;
        const createdAlbum = { id, title, genre, picture, artist};
        res.status(201).json(createdAlbum);
      }
    }
  );
});

router.put('/:id', (req, res) => {
  const albumId = req.params.id;
  const db = connection.promise();
  let existingAlbum = null;
  db.query('SELECT * FROM album WHERE id = ?', [albumId])
    .then(([results]) => {
      existingAlbum = results[0];
      if (!existingAlbum) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE album SET ? WHERE id = ?', [req.body, albumId]);
    })
    .then(() => {
      res.status(200).json({ ...existingAlbum, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`Album with id ${albumId} not found.`);
      else res.status(500).send('Error updating a album');
    });
});

router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM album WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting an album');
      } else {
        if (result.affectedRows) res.status(200).send('🎉 Album deleted!');
        else res.status(404).send('Album not found.');
      }
    }
  );
});

module.exports = router;