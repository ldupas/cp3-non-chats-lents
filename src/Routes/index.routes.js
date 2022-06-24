const router = require('express').Router();
const tracksRouter = require('./tracks.routes');
const albumsRouter = require('./albums.routes');

router.use('/tracks', tracksRouter);
router.use('/albums', albumsRouter);

module.exports = router;
