const connection = require("../../db-config");
const router = require("express").Router();
const Joi = require('joi');

const albumSchema = Joi.object({
  title: Joi.string().max(255).required(),
  genre: Joi.string().max(255),
  picture: Joi.string().max(255),
  artist: Joi.string().max(255),
})

router.get("/", (req, res) => {
  connection.query("SELECT * FROM album", (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving album from database");
    } else {
      res.json(result);
    }
  });
});

router.get("/:id", (req, res) => {
  const albumId = req.params.id;
  connection.query(
    "SELECT * FROM album WHERE id=?",
    [albumId],
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving album from database");
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send("album not found");
      }
    }
  );
});

router.post("/", (req, res) => {
  const { title, genre, picture, artist } = req.body;
  const { error } = albumSchema.validate({ title, genre, picture, artist }, { abortEarly: false });

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {

      connection.query(
        'INSERT INTO album (title, genre, picture, artist) VALUES (?, ?, ?, ?)',
        [title, genre, picture, artist],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error saving the album');
          } else {
            const id = result.insertId;
            const createdalbum = { id, title, genre, picture, artist };
            res.status(201).json(createdalbum);
          }
        }
      );
    }
  }
);

router.put('/:id', (req, res) => {
  const albumId = req.params.id;
  const db = connection.promise();
  let existingalbum = null;

  const { title, genre, picture, artist } = req.body;
  const { error } = albumSchema.validate({ title, genre, picture, artist }, { abortEarly: false });

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {

    db.query('SELECT * FROM album WHERE id = ?', 
    [albumId])
    .then(([results]) => {
        existingalbum = results[0];
        if (!existingalbum) return Promise.reject('album not found')
        return db.query('UPDATE album SET ? WHERE id = ?', [req.body, albumId]);
    })
    .then(() => {
        res.status(200).json({...existingalbum, ...req.body});
    })
    .catch((err) => {
        console.log(err);
        if (err === 'album not found')
        res.status(404).send(`album with id ${albumId} not found.`)
        else {
            res.status(500).send('Error updating album from database');
        }
    });
  }  
});

router.delete('/:id', (req, res) => {
  const albumId = req.params.id;
  connection.query(
      'DELETE FROM album WHERE id = ?',
      [albumId],
      (err, result) => {
          if (err) {
              console.log(err);
              res.status(500).send('Error while deleting an album');
          }
          else
          {
              if(result.affectedRows) res.status(200).send('🎉 album deleted')
              else res.status(404).send('album not found!')
          }
      }
  )
});

module.exports = router;
