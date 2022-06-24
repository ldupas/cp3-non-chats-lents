/* eslint-disable prettier/prettier */
const connection = require("../../db-config");
const router = require("express").Router();
const Joi = require('joi');

const trackSchema = Joi.object({
  title: Joi.string().max(128).required(),
  youtube_url: Joi.string().max(255),
  id_album: Joi.required(),
})

router.get("/", (req, res) => {
  connection.query("SELECT * FROM track", (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving track from database");
    } else {
      res.json(result);
    }
  });
});

router.get("/:id", (req, res) => {
  const trackId = req.params.id;
  connection.query(
    "SELECT * FROM track WHERE id=?",
    [trackId],
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving track from database");
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send("track not found");
      }
    }
  );
});

router.post("/", (req, res) => {
  const { title, youtube_url, id_album } = req.body;
  const { error } = trackSchema.validate({ title, youtube_url, id_album }, { abortEarly: false });

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {

      connection.query(
        'INSERT INTO track (title, youtube_url, id_album) VALUES (?, ?, ?)',
        [title, youtube_url, id_album],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error saving the track');
          } else {
            const id = result.insertId;
            const createdtrack = { id, title, youtube_url, id_album };
            res.status(201).json(createdtrack);
          }
        }
      );
    }
  }
);

router.put('/:id', (req, res) => {
  const trackId = req.params.id;
  const db = connection.promise();
  let existingtrack = null;

  const { title, youtube_url, id_album } = req.body;
  const { error } = trackSchema.validate({ title, youtube_url, id_album }, { abortEarly: false });

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {

    db.query('SELECT * FROM track WHERE id = ?', 
    [trackId])
    .then(([results]) => {
        existingtrack = results[0];
        if (!existingtrack) return Promise.reject('track not found')
        return db.query('UPDATE track SET ? WHERE id = ?', [req.body, trackId]);
    })
    .then(() => {
        res.status(200).json({...existingtrack, ...req.body});
    })
    .catch((err) => {
        console.log(err);
        if (err === 'track not found')
        res.status(404).send(`track with id ${trackId} not found.`)
        else {
            res.status(500).send('Error updating track from database');
        }
    });
  }  
});

router.delete('/:id', (req, res) => {
  const trackId = req.params.id;
  connection.query(
      'DELETE FROM track WHERE id = ?',
      [trackId],
      (err, result) => {
          if (err) {
              console.log(err);
              res.status(500).send('Error while deleting an track');
          }
          else
          {
              if(result.affectedRows) res.status(200).send('🎉 track deleted')
              else res.status(404).send('track not found!')
          }
      }
  )
});

module.exports = router;
