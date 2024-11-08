const express = require('express');
const fs = require('fs');
const {v4, uuidv4} = require('uuid');
const router = express.Router();

const videoFilePath= './data/videos.json';


const readVideos = () => JSON.parse(fs.readFileSync(videoFilePath));

router.get("/", (req, res) => {
    const videos = readVideos();
    const videoSummaries = videos.map(({id,title,channel,image}) => ({
        id,
        title,
        channel,
        image,
    }));
    res.json(videoSummaries);
});

router.get("/:id", (req,res) => {
    const videos = readVideos();
    const video = videos.find((video) => video.id === req.params.id);
    if(video){
        res.json(video);
    }else{
        res.status(404).json({error:"Video not found"});
    }
});

module.exports=router;