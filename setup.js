const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pooldb');

// create table for politicians, voters and voting
const createPoliticiansTable = `CREATE TABLE politicians (
  politician_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR,
  party VARCHAR,
  location VARCHAR,
  grade_current VARCHAR
);`;

const createVotersTable = `CREATE TABLE voters (
  voter_id INTEGER PRIMARY KEY AUTOINCREMENT, 
  first_name VARCHAR,
  last_name VARCHAR,
  gender VARCHAR,
  age INTEGER
);`;

const createVotesTable = `CREATE TABLE voting (
  vote_id INTEGER PRIMARY KEY AUTOINCREMENT,
  voter_id INTEGER,
  politician_id INTEGER,
  FOREIGN KEY(voter_id) REFERENCES voters(voter_id)
);`;

// db.run(votes);

module.exports = {
  sqlite3 : sqlite3
}