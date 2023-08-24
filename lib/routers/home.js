const express = require('express');
const Journal = require('../models/journal');

const Home = express.Router();

Home.get('/', async (req, res, next) => {
	try {
		const journals = await Journal.fetchAll();
		res.render('home', {journals});
	}
	catch (e) {
		console.error(e);
		next(e);
	}
});

module.exports = Home;
