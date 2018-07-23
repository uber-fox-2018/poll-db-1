const db = require('./db')

function setup() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS Politicians
      (id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR, party VARCHAR(1), location VARCHAR(2),
      grade_current INTEGER)
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS Voters
      (id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name VARCHAR, last_name VARCHAR, 
      gender VARCHAR(6), age INTEGER)
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS Votes
      (id INTEGER PRIMARY KEY AUTOINCREMENT,
      voter_id INTEGER, politician_id INTEGER,
      FOREIGN KEY (voter_id) REFERENCES Voters(id),
      FOREIGN KEY (politician_id) REFERENCES Politicians(id))
    `);
  })
}

setup();