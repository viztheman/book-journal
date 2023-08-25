const mongoose = require('mongoose');

const Journal = new mongoose.Schema({
	title: {type: String, required: true, maxlength: 100},
	author: {type: String, required: true, maxlength: 50},
	rating: {type: Number, required: true, min: 1, max: 5},
	notes: String
});

Journal.statics.fetchAll = async function() {
	return await this.find().lean();
};

Journal.statics.fetch = async function(id) {
	return await this.findById(id).lean();
};

Journal.statics.insert = async function(journal) {
	const model = new this(journal);
	await model.save();

	return model.toJSON();
};

Journal.statics.update = async function(id, journal) {
	const model = await this.findById(id);
	if (!model) return null;

	model.overwrite(journal);
	await model.save();
	return model.toJSON();
};

Journal.statics.delete = async function(id) {
	const result = await this.deleteOne({_id: id});

	return result.deletedCount > 0;
};

module.exports = mongoose.model('Journal', Journal);
