const router = require("express").Router();

const trackRouter = require("./track.routes");
const albumRouter = require("./album.routes");

router.use("/track", trackRouter);
router.use("/album", albumRouter);

module.exports = router;
