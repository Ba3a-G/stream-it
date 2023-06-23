const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const handlebars = require('express-handlebars');

const router = express.Router();

// routes here
router.get('/:media', (req, res) => {
    const mediaPath = path.join(__dirname, '..', 'vids', req.params.media);
    const mediaStat = fs.statSync(mediaPath);
    if (mediaStat.isFile()) {
        res.render('video', {url: mediaPath});
    } else if (mediaStat.isDirectory) {
        res.render('playlist', {path: mediaPath});
    }
})

module.exports = router