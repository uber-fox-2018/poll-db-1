//your code here

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');
 
function createTable(){
    db.serialize ( ()=> {
        db.run(`CREATE TABLE Politicians 
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
             name VARCHAR, 
             party VARCHAR, 
             location VARCHAR,
             grade_current INTEGER);`);

        db.run(`CREATE TABLE Voters 
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name VARCHAR,
                last_name VARCHAR,
                gender VARCHAR,
                age INTEGER)`);
        
        db.run(`CREATE TABLE Votes 
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
            voterId INTEGER,
            politicianId INTEGER)`)
         
    } ) 
}

//createTable()
module.exports = db;