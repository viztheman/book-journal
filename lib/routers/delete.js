const express = require('express');
const Journal = require('../models/journal');

const Delete = express.Router();

Delete.post('/', express.urlencoded({extended: false}), async (req, res, next) => {
	try {
		await Journal.delete(req.body.deleteId);
		res.redirect('/');
	}
	catch (e) {
		console.error(e);
		next(e);
	}
});

module.exports = Delete;
