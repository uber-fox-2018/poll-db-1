//your code here
const db = require('./db')


let politicians = `CREATE TABLE politicians(
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name VARCHAR,
                  party VARCHAR,
                  location VARCHAR,
                  grade_current INTEGER
)`

let voters = `CREATE TABLE voters(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR,
    last_name VARCHAR,
    gender VARCHAR,
    age INTEGER
)`

let votes = `CREATE TABLE votes(
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             politicians_id INTEGER,
             voters_id INTEGER,
             FOREIGN KEY (politicians_id) REFERENCES politicians(id),
             FOREIGN KEY (voters_id) REFERENCES voters(id)
)`


db.run(votes, function(err){
    if (err) throw err
    console.log('successfully created table')
})