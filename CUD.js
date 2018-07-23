const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

class CUD {

  static add (tableName, data, cb){
    if (tableName == 'Politicians'){
      db.run(`INSERT INTO ${tableName} (name, party, location, grade_current) VALUES (?, ?, ?, ?)`, data, (err) => {
        if (err) {
          cb(err.message);
        } else {
          cb(`${data} added succesfully to ${tableName} table`);
        }
      });
    } else if (tableName == 'Voters'){
      db.run(`INSERT INTO ${tableName} (first_name, last_name, gender, age) VALUES (?, ?, ?, ?)`, data, (err) => {
        if (err) {
          cb(err.message);
        } else {
          cb(`${data} added succesfully to ${tableName} table`);
        }
      });
     } else {
      db.run(`INSERT INTO ${tableName} (voter_id, politician_id) VALUES (?, ?)`, data, (err) => {
        if (err) {
          cb(err.message);
        } else {
          cb(`${data} added succesfully to ${tableName} table`);
        }
      });
    }
  }

  static update (tableName, data, cb){
    
  }
}

module.exports = CUD;