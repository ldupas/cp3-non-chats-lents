const router = require("express").Router();

const albumsRouter = require("./albums.routes");
const tracksRouter = require("./tracks.routes");

router.use("/albums", albumsRouter);
router.use("/tracks", tracksRouter);

module.exports = router;