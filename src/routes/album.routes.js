const router=require('express').Router();
const albumModel=require('../models/album.model');

router.get('/',async (req,res)=>{
    const albums=await albumModel.getAll();
    res.status(200).json(albums);
})

router.get('/:id', async (req,res)=>{
    const album=await albumModel.getOne(req.params.id);
    if(album){
        return res.status(200).json(album);
    }
    else{
        return res.status('404').send('Error : Album not found');
    }
});

router.get('/:id/tracks', async(req,res)=>{
    const result= await albumModel.getOne(req.params.id);
    if(result){
        const listTrack=await albumModel.getTrackFromAlbum(req.params.id);
        return res.status(200).json(listTrack);
    }
    else
        return res.status('404').send('Error : Album not found');
});

router.post('/',async (req,res)=>{
    const result=await albumModel.create(req.body);
    if(result){
        return res.status(201).json({...req.body,id:result});
    }
    else
        return res.sendStatus(500);
})

router.put('/:id',async(req,res)=>{
    const result=await albumModel.update(req.body,req.params.id);
    if(result){
        return res.sendStatus(204);
    }
    else
        return res.sendStatus(404);
})

router.delete('/:id', async (req,res)=>{
    const result=await albumModel.destroy(req.params.id);
    if(result){
        return res.sendStatus(204);
    }
    else
        return res.sendStatus(404);
})

module.exports=router;