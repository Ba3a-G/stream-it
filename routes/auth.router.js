const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const {checkAuth, verifyGoogleToken} = require('../utils/checkAuth')

const router = express.Router();

const users = {
    'admin': 'pass',
    'user': 'pass'
}

router.use(cors());
router.use(express.json());
router.use(express.urlencoded());

router.get('/', (req, res) => {
    // Implement Google sign in
    res.render('login');
});

router.post('/callback', async (req, res) => {
    let token = req.body.credential
    let payload = await verifyGoogleToken(token);
    if (payload) {
        console.log(payload.exp)
        res.set('Set-Cookie', `g_id=${token}; Expires=${payload.exp}`)
        res.redirect('/')
    } else {
        res.send('Nice Try MF!')
    }
});

router.get('/whois', async (req, res) => {
    let token = req.cookies.g_id;
    if (token) {
        let payload = await verifyGoogleToken(token);

        !payload ? res.status(401).send('NT MF!') : res.send(token)
    } else {
        res.redirect('/login')
    }
});

module.exports = router;