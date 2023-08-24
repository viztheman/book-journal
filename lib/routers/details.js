const express = require('express');
const Journal = require('../models/journal');

const Details = express.Router();

Details.get('/:id', async (req, res, next) => {
	try {
		const journal = await Journal.fetch(req.params.id);
		if (!journal) return res.redirect('/');

		res.render('details', {journal});
	}
	catch (e) {
		console.error(e);
		next(e);
	}
});

module.exports = Details;
