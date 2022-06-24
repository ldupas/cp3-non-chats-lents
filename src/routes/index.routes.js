const router=require('express').Router();
//const trackRouter=require('./track.routes');
const albumRouter=require('./album.routes');

//router.use('/tracks',trackRouter);
router.use('/albums',albumRouter);

module.exports=router;