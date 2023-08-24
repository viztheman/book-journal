const express = require('express');

const Edit = express.Router();

Edit.get('/', (req, res) => res.render('edit'));

module.exports = Edit;
