const {MONGODB} = process.env;

module.exports = MONGODB
	? require('./mongoose/journal')
	: require('./sqlite/journal');
