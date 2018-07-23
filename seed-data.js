const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll-db-1')

function insertDataPolitician(){
    let addPolitician = fs.readFileSync('./politicians.csv').toString().split('\n');
    // addPolitician.shift() //hapus di depan nama2 perkolomnya (name,party,dll)
    // console.log(addPolitician)

    for(let i=1; i<addPolitician.length-1;i++){
        let politician = addPolitician[i].split(',')
        // console.log(politician)
        let name = politician[0];
        let party = politician[1];
        let location = politician[2];
        let grade_current = politician[3];

        let query = `INSERT INTO Politicians (name,party,location,grade_current) VALUES ('${name}','${party}','${location}','${grade_current}')`


        db.serialize(function(){
            db.run(query, function(err){
                if(err) throw (err)
            })
        })
    }
}

function insertDataVoter(){
    let addVoter = fs.readFileSync('./voters.csv').toString().split('\n')
    // console.log(addVoter)
    for(let i = 1; i<addVoter.length-1; i++){
        let voter = addVoter[i].split(',')
        // console.log(voter)
        let first_name = voter[0]
        let last_name = voter[1]
        let gender = voter[2]
        let age = voter[3]

        let query = `INSERT INTO Voters (first_name,last_name,gender,age) VALUES ("${first_name}","${last_name}","${gender}","${age}")`

        db.serialize(function(){
            db.run(query,function(err){
                if(err) throw (err)
            })
        })
    
    }

}

function insertDataVote() {
    let addVote = fs.readFileSync('./votes.csv').toString().split('\n')
    // console.log(addVote)
    for(let i = 1; i<addVote.length-1;i++){
        let vote = addVote[i].split(',')
        // console.log(vote)

        let voterId = vote[0]
        let politicianId = vote[1]

        let query = `INSERT INTO Votes (voterId,politicianId) VALUES ('${voterId}','${politicianId}')`

        db.serialize(function(){
            db.run(query,function(err){
                if(err) throw (err)
            })
        })
    }
}

function addVoter(first_name,last_name,gender,age){
    let query = `INSERT INTO Voters (first_name,last_name,gender,age) 
                 VALUES ('${first_name}','${last_name}','${gender}','${age}')`

    db.serialize(function(){
        db.run(query,function(err){
            if(err) throw(err)
        })
    })
}

function addPolitician(name,party,location,grade_current){
    let query = `INSERT INTO Politicians (name,party,location,grade_current) 
                 VALUES ('${name}','${party}','${location}','${grade_current}')`

    db.serialize(function(){
        db.run(query,function(err){
            if(err) throw(err)
        })
    })
}

function removePolitician(politicianId){
    let query = `DELETE FROM Politicians WHERE politicianId = ${politicianId};`

    db.serialize(function(){
        db.run(query,function(err){
            if(err) throw (err);
            // (err)
        })
    })
}

function updateVoter(voterId,first_name,last_name,gender,age){
    let query = `UPDATE Voters SET
                    first_name = '${first_name}',
                    last_name = '${last_name}',
                    gender = '${gender}',
                    age = ${age}
                WHERE voterId = ${voterId}`

    db.serialize(function() {
        db.run(query, function(err){
            if(err) throw(err)
        })
    })

}

function partyR(){
    let query = `SELECT * FROM Politicians WHERE party = 'R' 
                 AND grade_current  BETWEEN 9 AND 11`
    
    db.all(query,function(err,data){
        if (err) throw (err)
        console.table(data)

    })
}

function OlympiaSnoweVote(){
let query = `SELECT  COUNT(Votes.politicianId) AS TotalVote, name 
             FROM Politicians
             JOIN  Votes
             ON Politicians.politicianId = Votes.politicianId
             WHERE name = "Olympia Snowe"`

db.all(query,function(err,data){
    if(err) throw (err)
    console.table(data)
})

}

function countVoteAdam(){
    let query = `SELECT  name,COUNT(name) as TotalVote 
                 FROM Politicians
                 JOIN  Votes
                 ON Politicians.politicianId= Votes.politicianId
                 WHERE Politicians.name LIKE '%adam%' 
                 GROUP BY name`

    db.all(query,function(err,data){
        if(err) throw (err)
        console.table(data)
    })
}

function threeMostVote(){
    let query = `SELECT  COUNT(*) AS totalVote,name, party, location 
                 FROM Politicians
                    JOIN  Votes
                    ON Politicians.politicianId = Votes.politicianId
                 GROUP BY name
                 ORDER BY totalVote DESC
                 LIMIT 3`
    db.all(query,function(err,data) {
        if(err) throw (err)
        console.table(data)
    })
}

function votersOlympiaSnowe(){
    let query = `SELECT first_name, last_name, gender,age FROM Votes
                 INNER JOIN  Politicians
                 ON Votes.politicianId = Politicians.politicianId 
                 INNER JOIN Voters
                 ON Voters.VoterId = Votes.voterId
                 WHERE name = 'Olympia Snowe'`

    db.all(query, function(err,data){
        if (err) throw (err)
        console.table(data)
    })

}


// insertDataPolitician()
// insertDataVoter()
// insertDataVote()
// partyR()
// OlympiaSnoweVote()
// countVoteAdam()
// threeMostVote()
// votersOlympiaSnowe()

// addVoter('Cimz','Mingz','male',30)
// addPolitician('mingzci','PIN','Jakarta', 10.000000000)
// removePolitician(21)
// updateVoter(151,'Min','Ci','male', 23)


/*
RELEASE 3 :

 1. SELECT * FROM Politicians WHERE party = 'R' 
    AND grade_current  BETWEEN 9 AND 11;  

 2. SELECT  COUNT(Votes.politicianId) AS TotalVote, name 
    FROM Politicians
    JOIN  Votes
    ON Politicians.politicianId = Votes.politicianId
    WHERE name = "Olympia Snowe";

 3. SELECT  name,COUNT(name) as TotalVote 
    FROM Politicians
        JOIN  Votes
        ON Politicians.politicianId= Votes.politicianId
    WHERE Politicians.name LIKE '%adam%' 
    GROUP BY name

4. SELECT  COUNT(*) AS totalVote,name, party, location 
   FROM Politicians
        JOIN  Votes
        ON Politicians.politicianId = Votes.politicianId
   GROUP BY name
   ORDER BY totalVote DESC
   LIMIT 3;

5. SELECT first_name, last_name, gender,age FROM Votes
   INNER JOIN  Politicians
   ON Votes.politicianId = Politicians.politicianId 
   INNER JOIN Voters
   ON Voters.VoterId = Votes.voterId
   WHERE name = 'Olympia Snowe';

*/

