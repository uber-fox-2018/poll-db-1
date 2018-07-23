//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/db_poll.db');

// Insert the table
db.serialize(function() {
	db.run("CREATE TABLE IF NOT EXISTS politicians(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,party TEXT,location TEXT,grade_current REAL)");
	db.run("CREATE TABLE IF NOT EXISTS voters(id INTEGER PRIMARY KEY AUTOINCREMENT,first_name TEXT,last_name TEXT,gender TEXT,age INTERGER)");
	db.run("CREATE TABLE IF NOT EXISTS votes(id INTEGER PRIMARY KEY AUTOINCREMENT,voter_id INTEGER,politician_id INTEGER,FOREIGN KEY (voter_id) REFERENCES voters(id),FOREIGN KEY (politician_id) REFERENCES politicians(id))")
});

module.exports = db
