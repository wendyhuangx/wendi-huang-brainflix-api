const express = require('express');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');
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

router.post("/", (req, res) =>{
    const {title, description} = req.body;
    if(!title||!description){
        return res.status(400).json({error: "Title and description are required"});
    }
    const newVideo = {
        id: uuidv4(),
        title,
        channel:"Uses for Peanut Butter",
        image:"/images/default-thumbnail.jpg",
        description,
        views: "0",
        likes: "0",
        duration: "4:10",
        video: "/stream",
        timestamp: Date.now(),
        comments:[],
    };
    const videos = readVideos();
    videos.push(newVideo);

    fs.writeFileSync(videoFilePath, JSON.stringify(videos, null,2));
    res.status(201).json(newVideo);
});


module.exports=router;