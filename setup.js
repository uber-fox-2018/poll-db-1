const db = require('./db.js');

function create_and_seed() {
    db.serialize(function () {
        db.run(`CREATE TABLE IF NOT EXISTS Politicians 
        (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), party VARCHAR(50), location VARCHAR(255), grade_current FLOAT)`);

        db.run(`CREATE TABLE IF NOT EXISTS Voters
        (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), gender VARCHAR(10), age INTEGER)`);

        db.run(`CREATE TABLE IF NOT EXISTS Votes
        (id INTEGER PRIMARY KEY AUTOINCREMENT, voterId INTEGER, politicianId INTEGER,
        FOREIGN KEY (politicianId) REFERENCES Politicians(id),
        FOREIGN KEY (voterId) REFERENCES Voters(id))`);
    });
}

create_and_seed();