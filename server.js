const express = require('express');
const watchRouter = require('./routes/watch.router')

const PORT = process.argv[2] | 80
const app = express();

app.use('/watch', watchRouter);

app.get('/', (req, res) => {
    res.send('Made with ❤️ by Ba3a.')
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT} ...`);
})