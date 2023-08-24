require('dotenv').config();
const {PORT, MONGODB} = process.env;

const express = require('express');
const helmet = require('helmet');
const path = require('path');
const mongoose = require('mongoose');

main().catch(e => console.error(e));

async function main() {
	await mongoose.connect(MONGODB);

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
	app.use('/details', require('./lib/routers/details'));

	app.listen(PORT, () => console.log(`Book Journal listening on port ${PORT}`));
}
