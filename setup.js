//your code here
const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./poll_db.db');
var CREATE_TABLE_POLITICIANS = "CREATE TABLE IF NOT EXISTS Politicians (politicianID INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, party VARCHAR, location TEXT, grade_current REAL)";
var CREATE_TABLE_VOTERS = "CREATE TABLE IF NOT EXISTS Voters (voterID INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR, last_name VARCHAR, gender VARCHAR(6), age INTEGER)";
var CREATE_TABLE_VOTES =  "CREATE TABLE IF NOT EXISTS Votes (id INTEGER PRIMARY KEY AUTOINCREMENT, voterID INTEGER, politicianID INTEGER, FOREIGN KEY (voterID) REFERENCES Voters (voterID), FOREIGN KEY (politicianID) REFERENCES Politicians (politicianID))";
function create(){
    db.serialize(function() {
        db.run(CREATE_TABLE_POLITICIANS);
        db.run(CREATE_TABLE_VOTERS);
        db.run(CREATE_TABLE_VOTES);
    })
    
}
create();

module.exports = db;
