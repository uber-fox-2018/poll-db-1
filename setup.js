//your code here
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./database.db");

function createTable() {
  db.serialize(function() {
    db.run(`CREATE TABLE IF NOT EXISTS Politicians (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR (20),
          party VARCHAR (20),
          location VARCHAR (20),
          grade_current FLOAT)`);

    db.run(`CREATE TABLE IF NOT EXISTS Voters 
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
              first_name VARCHAR(50),
              last_name VARCHAR (50),
              gender VARCHAR(10),
              age INTEGER
          )`);

    db.run(`CREATE TABLE IF NOT EXISTS Votes 
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
              voterId INTEGER, 
              politicianId INTEGER,
              FOREIGN KEY (voterId) REFERENCES Voters(id),
              FOREIGN KEY (politicianId) REFERENCES Politicians(id)

          )`);
  });
}

createTable();

module.exports = {
  db
};
