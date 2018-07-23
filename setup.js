//your code here
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./poll-db-1')

function create(){

    db.serialize(function(){

        db.run(`CREATE TABLE IF NOT EXISTS Politicians
               (politicianId INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR,
                party VARCHAR,
                location VARCHAR,
                grade_current FLOAT)`);

        db.run(`CREATE TABLE IF NOT EXISTS Voters
                (voterId INTEGER PRIMARY KEY AUTOINCREMENT, 
                 first_name VARCHAR,
                 last_name VARCHAR,
                 gender VARCHAR, 
                 age INTEGER)`)
        
        db.run(`CREATE TABLE IF NOT EXISTS Votes
                (voteId INTEGER PRIMARY KEY AUTOINCREMENT,
                 voterId INTEGER,
                 politicianId INTEGER,
                 FOREIGN KEY (voterId) REFERENCES Voters(voterId),
                 FOREIGN KEY (politicianId) REFERENCES Politicians(politicianId))`)
    })
}   

create()

