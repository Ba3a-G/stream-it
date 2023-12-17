const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const handlebars = require("express-handlebars");

const router = express.Router();

// routes here
router.get("/*", (req, res) => {
    resource = req._parsedUrl.path;
    const mediaPath = path.join(__dirname, "..", "vids", resource);
    const mediaStat = fs.statSync(mediaPath);

    if (mediaStat.isFile()) {
        const fileName = path.basename(mediaPath);
        let videoTitle = fileName.split(".")[0];
        let videoDescription = null;
        const data = {
            url: `/watchraw${resource}`,
            title: videoTitle || "Video title could not be found",
            description: videoDescription || "Video description could not be found",
        };
        res.render("video", data);
    } else if (mediaStat.isDirectory) {
        const files = fs.readdirSync(mediaPath);
        const videos = [];
        files.forEach((file) => {
            const filePath = path.join(mediaPath, file);
            const fileStat = fs.statSync(filePath);
            if (fileStat.isFile()) {
                videos.push({
                    sources: [
                        {
                            src: `/watchraw${resource}/${file}`,
                            type: "video/mp4",
                        },
                    ],
                });
            }
        });
        res.render("playlist", {
            videos: JSON.stringify(videos),
        });
    }
});

module.exports = router;
