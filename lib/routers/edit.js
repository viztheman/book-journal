const express = require('express');
const Journal = require('../models/journal');

const Edit = express.Router();

Edit.get('/:id', async (req, res, next) => {
	try {
		const journal = await Journal.fetch(req.params.id);
		if (!journal) res.redirect('/');

		res.render('edit', {journal});
	}
	catch (e) {
		console.error(e);
		next(e);
	}
});

Edit.post('/:id', express.urlencoded({extended: false}), async (req, res, next) => {
	try {
		await Journal.update(req.params.id, req.body);
		res.redirect(`/details/${req.params.id}`);
	}
	catch (e) {
		console.error(e);
		next(e);
	}
});

module.exports = Edit;
