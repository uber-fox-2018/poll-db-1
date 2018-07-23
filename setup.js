//your code here
const db = require('./db')

let query_drop = `DROP TABLE Votes`
let query_table_politician = `CREATE TABLE IF NOT EXISTS Politicians (
                              politicianId INTEGER PRIMARY KEY AUTOINCREMENT,
                              name VARCHAR,
                              party VARCHAR,
                              location VARCHAR,
                              grade_current FLOAT);`

let query_table_voter = `CREATE TABLE IF NOT EXISTS Voters (
                         voterId INTEGER PRIMARY KEY AUTOINCREMENT,
                         first_name VARCHAR,
                         last_name VARCHAR,
                         gender VARCHAR(8),
                         age INTEGER);`

let query_table_vote = `CREATE TABLE IF NOT EXISTS Votes (
                        voteId INTEGER PRIMARY KEY AUTOINCREMENT,
                        voterId INTEGER,
                        politicianId INTEGER,
                        FOREIGN KEY (voterId) REFERENCES Voters(voterId)
                        FOREIGN KEY (politicianId) REFERENCES Politicians(politicianId))`
                

db.run(query_table_politician, function(err){
    if (err) throw err;
    console.log(`sukses add table politician`);
})

db.run(query_table_voter, function(err) {
    if (err) throw err
    console.log('sukses add table voter');
})

db.run(query_table_vote, function(err){
    if (err) throw err
    console.log('sukses add table vote');
})
