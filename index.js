require('dotenv').config();
const {PORT} = process.env;

const express = require('express');
const helmet = require('helmet');
const path = require('path');

const app = express();
app.set('view engine', 'pug');
app.use(helmet());
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/@popperjs/core/dist/umd')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.use('/', require('./lib/routers/home'));
app.use('/add', require('./lib/routers/add'));
app.use('/edit', require('./lib/routers/edit'));

app.listen(PORT, () => console.log(`Book Journal listening on port ${PORT}`));
