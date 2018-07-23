const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

db.serialize(() => {

  db.run(`CREATE TABLE IF NOT EXISTS Politicians
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(50),
          party VARCHAR(3),
          location VARCHAR(3),
          grade_current REAL)`, 
    (err)=> {if (err){
      console.log(err.message);
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS Voters
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name VARCHAR(15),
          last_name VARCHAR(15),
          gender VARCHAR(8),
          age INTEGER)`,
    (err)=> {if (err){
      console.log(err.message);
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS PoliticianVoters
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          voter_id INTEGER REFERENCES Voters(id),
          politician_id INTEGER REFERENCES Politicians(id))`,
    (err)=> {if (err){
      console.log(err.message);
    }
  });

  db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  })

});