const express = require('express');
var cookieParser = require('cookie-parser')
const hbs = require('express-handlebars').create();

const watchRouter = require('./routes/watch.router');
const playRouter = require('./routes/play.router');
const authRouter = require('./routes/auth.router');

require('dotenv').config()
const PORT = process.argv[2] | process.env.PORT
const app = express();

app.use(cookieParser())

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/static', express.static('static'));

app.use('/watchraw', watchRouter);
app.use('/play', playRouter);
app.use('/login', authRouter);

app.get('/', (req, res) => {
    res.send('Made with ❤️ by Ba3a.')
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT} ...`);
})