const router = require('express').Router();
const trackRouter = require('./track.route');
const albumRouter = require('./album.route');

router.use('/track', trackRouter);
router.use('/album', albumRouter);

module.exports = router;