const express = require('express');

const Add = express.Router();

Add.get('/', (req, res) => res.render('add'));

module.exports = Add;
