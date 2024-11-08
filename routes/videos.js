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
module.exports=router;