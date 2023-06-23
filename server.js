const express = require('express');
const hbs = require('express-handlebars').create();

const watchRouter = require('./routes/watch.router');
const playRouter = require('./routes/play.router');

const PORT = process.argv[2] | 3000
const app = express();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/static', express.static('static'));

app.use('/watchraw', watchRouter);
app.use('/play', playRouter);

app.get('/', (req, res) => {
    res.send('Made with ❤️ by Ba3a.')
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT} ...`);
})