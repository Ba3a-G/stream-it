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
        res.render('video', {url: `/watchraw${resource}`});
    } else if (mediaStat.isDirectory) {
        res.render('playlist', {path: mediaPath});
    }
})

module.exports = router