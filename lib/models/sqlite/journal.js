const {SQLITE} = process.env;

const db = require('better-sqlite3')(SQLITE);
db.pragma('journal_mode = WAL');

module.exports = {
	fetchAll: function(limit) {
		const limitNum = parseInt(limit, 10);

		const statement = limitNum > 0
			? db.prepare(`SELECT * FROM journals LIMIT ${limitNum}`)
			: db.prepare('SELECT * FROM journals');

		return statement.all();
	},
	fetch: function(id) {
		return db.prepare('SELECT * FROM journals WHERE _id = ?').get(id);
	},
	search: function(text) {
		const likeStr = `%${text}%`;

		return db
			.prepare('SELECT * FROM journals WHERE title LIKE ? OR author LIKE ? OR notes LIKE ?')
			.all(likeStr, likeStr, likeStr);
	},
	insert: function(journal) {
		db
			.prepare('INSERT INTO journals(title, author, rating, notes) VALUES(?, ?, ?, ?)')
			.run(journal.title, journal.author, journal.rating, journal.notes);

		return {...journal};
	},
	update: function(id, journal) {
		db
			.prepare('UPDATE journals SET title = ?, author = ?, rating = ?, notes = ? WHERE _id = ?')
			.run(journal.title, journal.author, journal.rating, journal.notes, id);

		return {...journal, _id: id};
	},
	delete: function(id) {
		const info = db.prepare('DELETE FROM journals WHERE _id = ?').run(id);
		return info.changes > 0;
	}
};
