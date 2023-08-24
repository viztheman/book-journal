const express = require('express');

const Details = express.Router();

Details.get('/', (req, res) => res.render('details'));

module.exports = Details;
