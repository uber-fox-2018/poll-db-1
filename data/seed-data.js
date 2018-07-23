const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('../database/database.db')
const fs = require('fs');


function seedData (dataPoliticians, dataVoters, dataVotes){
    let politicians = [];
    let voters = [];
    let votes = []

    //Prepare Data Array before Insert to Table
    for(let i=1; i<dataPoliticians.length-1; i++){
        politicians.push(dataPoliticians[i].split(','))
    }

    for(let i=1; i<dataVoters.length-1; i++){
        voters.push(dataVoters[i].split(','))
    }

    for(let i=1; i<dataVotes.length-1; i++){
        votes.push(dataVotes[i].split(','))
    }

    // Result Array Multidimentional
    // console.log(politicians);
    // console.log(voters);
    // console.log(votes);
    
    //Insert to database
    for(let i=0; i<politicians.length; i++){        
         db.serialize(function() {
            db.run(`INSERT INTO Politicians 
                    (name, party, location, grade_current)
                    VALUES ("${politicians[i][0]}", "${politicians[i][1]}", "${politicians[i][2]}", ${politicians[i][3]});`
            )                
        })
    }
    
    for(let i=0; i<voters.length; i++){
        db.serialize(function() {
            db.run(`INSERT INTO Voters
                    (first_name, last_name, gender, age)
                    VALUES ("${voters[i][0]}", "${voters[i][1]}", "${voters[i][2]}", ${voters[i][3]});`
            )
        })
    }

    for(let i=0; i<votes.length; i++){
        db.serialize(function() {
            db.run(`INSERT INTO Votes
                    (voterId, politicianId)
                    VALUES (${votes[i][0]}, ${votes[i][1]});`
            )
        })
    }
    

}

let dataPoliticians = fs.readFileSync('../database/politicians.csv', 'utf8').split('\n');
let dataVoters = fs.readFileSync('../database/voters.csv', 'utf8').split('\n');
let dataVotes = fs.readFileSync('../database/votes.csv', 'utf8').split('\n');

seedData(dataPoliticians, dataVoters, dataVotes)