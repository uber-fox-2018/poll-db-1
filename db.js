var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./poll.db');

modul.exports = db;
