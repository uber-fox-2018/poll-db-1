const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

class CUD {

  static addData (tableName, data, cb){
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

  static updateData (tableName, id, input, cb){
    let arrQuery = []  
    for (let i = 0; i < input.length - 1; i+=2){
      arrQuery.push(`${input[i]} = '${input[i + 1]}'`)
    }
    let setQuery = arrQuery.join(', ');
    
    db.run(`UPDATE ${tableName} SET ${setQuery} WHERE id = ${id}`, (err) => {
      if (err) {
        cb(err.message);
      } else {
        cb(`data in ${tableName} table updated succesfully`);
      }
    });
  }

  static deleteData (tableName, id, cb){
    db.run(`DELETE FROM ${tableName} WHERE id = ${id}`, (err) => {
      if (err) {
        cb(err.message);
      } else {
        cb(`data in ${tableName} table deleted succesfully`);
      }
    });
  }
}

module.exports = CUD;