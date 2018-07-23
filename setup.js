//your code here
var sqlite = require('sqlite3').verbose()
var file = 'pollDB.db'
var db = new sqlite.Database(file)
var fs = require('fs')


//Insert the table//

db.serialize(function() {
	db.run("CREATE TABLE IF NOT EXISTS politicians(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,party TEXT,location TEXT,grade_current REAL)");
	db.run("CREATE TABLE IF NOT EXISTS voters(id INTEGER PRIMARY KEY AUTOINCREMENT,first_name TEXT,last_name TEXT,gender TEXT,age INTERGER)");
	db.run("CREATE TABLE IF NOT EXISTS votes(id INTEGER PRIMARY KEY AUTOINCREMENT,voter_id INTEGER,politician_id INTEGER,FOREIGN KEY (voter_id) REFERENCES voters(id),FOREIGN KEY (politician_id) REFERENCES politicians(id))")
});



