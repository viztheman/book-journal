const express = require('express');

const Home = express.Router();

Home.get('/', (req, res) => res.render('home'));

module.exports = Home;
