const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const handlebars = require('express-handlebars');

const router = express.Router();

// routes here
router.get('/*', (req, res) => {
    resource = req._parsedUrl.path
    const mediaPath = path.join(__dirname, '..', 'vids', resource);
    const mediaStat = fs.statSync(mediaPath);

    if (mediaStat.isFile()) {
        let videoTitle = null;
        let videoDescription = null;
        const data = {
            url: `/watchraw${resource}`,
            title: videoTitle | 'Video title could not be found',
            description: videoDescription | 'Video description could not be found'
        };
        res.render('video', data);
    } else if (mediaStat.isDirectory) {
        res.render('playlist', {path: mediaPath});
    };
});

module.exports = router