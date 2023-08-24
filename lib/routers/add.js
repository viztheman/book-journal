const express = require('express');
const Journal = require('../models/journal');

const Add = express.Router();

Add.get('/', (req, res) => res.render('add'));

Add.post('/', express.urlencoded({extended: false}), async (req, res, next) => {
	try {
		const journal = await Journal.insert(req.body);
		res.redirect('/');
	}
	catch (e) {
		console.error(e);
		next(e);
	}
});

module.exports = Add;
