//your code here


const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('pollDB1', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });



  db.serialize(function(){
    db.run(`CREATE TABLE IF NOT EXISTS politicians 
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(30),
          party VARCHAR(5),
          location VARCHAR(5),
          grade_current FLOAT)`);
    
    db.run(`CREATE TABLE IF NOT EXISTS voters
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
             first_name VARCHAR(15),
             last_name VARCHAR(15),
             gender VARCHAR(8),
             age INTEGER) `);
    
    db.run(`CREATE TABLE IF NOT EXISTS votes
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
             voterId INTEGER,
             politiciansId INTEGER,
             FOREIGN KEY(voterId) REFERENCES voters(id),
             FOREIGN KEY(politiciansId) REFERENCES politicians(id))`);
  })



// create_and_seed()



