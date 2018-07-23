const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');
const fs = require('fs');

class Parser {
  
  static parsing(path) {
    let arr = fs.readFileSync(path, 'utf-8').split('\n');
    arr.shift();
    let result = [];
    
    arr.forEach((data) => {
      result.push(data.split(','))
    })

    return result;
  }
}

class Seed {

  static write (tableName, data) { 
    if (tableName == 'Politicians'){
      data.forEach ((row)=> {
        db.run(`INSERT INTO ${tableName} (name, party, location, grade_current) VALUES (?, ?, ?, ?)`, row, (err) => {
          if (err) {
            console.log(err.message);
          }
        });
      })
    } else if (tableName == 'Voters'){
      data.forEach ((row)=> {
        db.run(`INSERT INTO ${tableName} (first_name, last_name, gender, age) VALUES (?, ?, ?, ?)`, row, (err) => {
          if (err) {
            console.log(err.message);
          }
        });
      })
     } else {
      data.forEach ((row)=> {
        db.run(`INSERT INTO ${tableName} (voter_id, politician_id) VALUES (?, ?)`, row, (err) => {
          if (err) {
            console.log(err.message);
          }
        });
      })
    }
  }
}

let politiciansData = Parser.parsing('politicians.csv');
let votersData = Parser.parsing('voters.csv');
let politicianVotersData = Parser.parsing('votes.csv');

Seed.write(politiciansData, 'Politicians');
Seed.write(votersData, 'Voters');
Seed.write(politicianVotersData, 'PoliticianVoters');

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
})