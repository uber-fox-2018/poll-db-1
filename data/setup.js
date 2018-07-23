//your code here
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('../database/database.db')

function create() {
    db.serialize(function() {
        db.run(
            `CREATE TABLE Politicians (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(100),
                party VARCHAR(50),
                location VARCHAR(100),
                grade_current FLOAT
            );`
        );
        db.run(
            `CREATE TABLE Voters (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name VARCHAR(50),
                last_name VARCHAR(50),
                gender VARCHAR(50),
                age NUMBER(150)
            );`
        );
        db.run(
            `CREATE TABLE Votes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                voterId INTEGER,
                politicianId INTEGER,
                FOREIGN KEY(voterId) REFERENCES Voters(id),
                FOREIGN KEY(politicianId) REFERENCES Politicians(id)
            );`
        );
    });
}

create()

module.exports = [sqlite3, db];