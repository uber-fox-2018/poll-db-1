const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pooldb');

let voters = `CREATE TABLE voters(
  voters_id INTEGER PRIMERY KEY AUTO INCREMENT,
  first_name VARCHAR,
  last_name VARCHAR,
  gender VARCHAR,
  age INTEGER
);`;


let votes = `CREATE TABLE votes(
  voters_id INTEGER PRIMERY KEY AUTO INCREMENT,
  politician_id INTEGER PRIMERY KEY AUTO INCREMENT
);`;

let politician = `CREATE TABLE politician(
  politician_id INTEGER PRIMERY KEY AUTO INCREMENT,
  name VARCHAR,
  party VARCHAR,
  location VARCHAR,
  grade_current INTEGER
);`;




// db.run(voters);
// db.run(votes);
db.run(votes, (err)=>{
  if (err) throw err
  console.log('asdasd');
});
