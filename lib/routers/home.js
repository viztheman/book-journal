const WORD_LIMIT = 15;

const express = require('express');
const Journal = require('../models/journal');

const Home = express.Router();

function trimWords(words) {
	const splits = words.split(' ');
	const result = splits.slice(0, WORD_LIMIT).join(' ');

	return splits.length > WORD_LIMIT ? result + '...' : result;
}

Home.get('/', async (req, res, next) => {
	try {
		const journals = await Journal.fetchAll();
		journals.forEach(x => x.notes = trimWords(x.notes));
		res.render('home', {journals});
	}
	catch (e) {
		console.error(e);
		next(e);
	}
});

module.exports = Home;
