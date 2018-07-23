const fs = require('fs');
const db = require('./setup');

function insertPolitician(){
    let politicians = fs.readFileSync('./politicians.csv', 'utf-8').split("\n").slice(1,-1);
    db.serialize(function() {
        for(let politician of politicians){
            let data = politician.split(",");
            let name = data[0];
            let party = data[1];
            let location = data[2];
            let grade_current = Number(data[3]);
            // console.log(name)
            let query = `INSERT INTO Politicians (name, party, location, grade_current)
                           VALUES ('${name}', '${party}', '${location}', ${grade_current})`; 
           
            db.run(query, function (err) {
                if (err) throw err;
                console.log('Successfully created a new row!');
            });
           
        }
    })
    
}

function insertVoters(){
    let voters = fs.readFileSync('./voters.csv', 'utf-8').split("\n").slice(1,-1);
    db.serialize(function() {
        for(let voter of voters){
            let data = voter.split(",");
            let fname= data[0];
            let lname = data[1];
            let gender = data[2];
            let age = Number(data[3]);
            
            let query = `INSERT INTO Voters (first_name, last_name, gender, age)
                           VALUES ("${fname}", "${lname}", "${gender}", ${age})`; 
            
            db.run(query, function (err) {
                if (err) throw err;
                console.log('Successfully created a new row!');
            });
        }
    })
    
}

function insertVotes(){
    let votes = fs.readFileSync('./votes.csv', 'utf-8').split("\n").slice(1,-1);
    db.serialize(function() {
        for(let vote of votes){
            let data = vote.split(",");
            let politicianID= Number(data[1]);
            let voterID = Number(data[0]);
            
            let query = `INSERT INTO Votes (voterID, politicianID)
                           VALUES (${voterID},${politicianID})`; 
            
            db.run(query, function (err) {
                if (err) throw err;
                console.log('Successfully created a new row!');
            }); 
        }
    }) 
}

// insertPolitician();
// insertVoters();
// insertVotes();




