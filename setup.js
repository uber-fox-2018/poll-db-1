//your code here
const db = require('./db')

const politicians = `CREATE TABLE IF NOT EXISTS Politicians (  
                    politicianID INTEGER PRIMARY KEY AUTOINCREMENT,
                    name VARCHAR,
                    party VARCHAR,
                    location VARCHAR,
                    grade_current FLOAT)`;

const voters = `CREATE TABLE IF NOT EXISTS Voters (
                voterID INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name VARCHAR,
                last_name VARCHAR,
                gender VARCHAR(8),
                age INTEGER)`;

const votes = `CREATE TABLE IF NOT EXISTS Votes (
                voteID INTEGER PRIMARY KEY AUTOINCREMENT,
                voterID INTEGER,
                politicianID INTEGER,
                FOREIGN KEY (politicianID) REFERENCES Politicians(politicianID),
                FOREIGN KEY (voterID) REFERENCES Voter(voterID))`;

db.serialize(() => {
    db.run(politicians, function(err) {
        console.log(err)
    })
    db.run(voters, function(err) {
        console.log(err)
    })
    db.run(votes, function(err) {
        console.log(err)
    })
})



