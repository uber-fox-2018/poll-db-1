const db = require('./db')
const fs = require('fs')

function addPolitician() {
    let file_politician  = fs.readFileSync('./politicians.csv').toString().split('\n')
    let politician_array = [] 
    
    for (let i = 1; i < file_politician.length-1; i++) {
        let politician = file_politician[i].split(',')
        politician_array.push(politician) 
    }
    
    for (let i = 0; i < politician_array.length; i++) {
        db.run(`INSERT INTO Politicians (name,party,location,grade_current) VALUES ('${politician_array[i][0]}','${politician_array[i][1]}','${politician_array[i][2]}','${politician_array[i][3]}');`)   
    }
}

function addVoter() {
    let file_voter  = fs.readFileSync('./voters.csv').toString().split('\n')
    let voter_array = []

    for (let i = 1; i < file_voter.length-1; i++) {
        let voter = file_voter[i].split(',')
        voter_array.push(voter)
    }

    for (let i = 0; i < voter_array.length; i++) {
        db.run(`INSERT INTO Voters (first_name,last_name,gender,age) VALUES ("${voter_array[i][0]}","${voter_array[i][1]}","${voter_array[i][2]}","${voter_array[i][3]}");`)
    }
    
}

function addVote() {
    let file_votes = fs.readFileSync('./votes.csv').toString().split('\n')
    let votes_array = []

    for (let i = 1; i < file_votes.length-1; i++) {
        let vote = file_votes[i].split(',')
        votes_array.push(vote)
    }
    
    for (let i = 0; i < votes_array.length; i++) {
        db.run(`INSERT INTO Votes (voterId,politicianId) VALUES ("${votes_array[i][0]}","${votes_array[i][1]}")`)
    }
    
}

function insertPolitician(name,party,location,grade_current){
    let query = `INSERT INTO Politicians (name,party,location,grade_current) VALUES ("${name}","${party}","${location}","${grade_current}")`

    db.run(query, function(err) {
        if (err) throw err
        console.log(`data Politician has been inserted!`);
    })
}

function insertVoter(first_name,last_name,gender,age) {
    let query = `INSERT INTO Voters (first_name,last_name,gender,age) VALUES ("${first_name}","${last_name}","${gender}","${age}")`

    db.run(query,function(err) {
        if(err) throw err
        console.log(`data Voter has been inserted!`);
    })
}

function insertVote(voterId,politicianId) {
    let query = `INSERT INTO Votes (voterId,politicianId) VALUES ("${voterId}","${politicianId}")`

    db.run(query,function(err) {
        if(err) throw err
        console.log(`data Vote has been inserted!`);
    })
}

function updatePolitician(name,party,location,grade_current,id){
    let query = `UPDATE Politicians SET 
                 name          = "${name}",
                 party         = "${party}",
                 location      = "${location}",
                 grade_current = "${grade_current}"
                 WHERE politicianId      = "${id}"`

    db.run(query,function(err){
        if(err) throw err
        console.log(`data has been updated`);
    })
}

function updateVoter(first_name,last_name,gender,age,id){
    let query = `UPDATE Voters SET
                 first_name = "${first_name}",
                 last_name  = "${last_name}",
                 gender     = "${gender}",
                 age        = "${age}"
                 WHERE voterId   = "${id}"`
}

function updateVote(politicianId,voterId,id) {
    let query = `UPDATE Votes SET
                 politicianId = "${politicianId}",
                 voterId      = "${voterId}"
                 WHERE voteId = "${id}"`
}

function deletePolitician(id) {
    let query = `DELETE FROM Politicians 
                 WHERE politicianId = "${id}"`

    db.run(query, function(err){
        if(err) throw err
        console.log(`data has been deleted`);
    })
}

function deleteVoter(id) {
    let query = `DELETE FROM Voters 
                 WHERE voterId = "${id}"`

    db.run(query, function(err){
        if(err) throw err
        console.log(`data has been deleted`);
    })
}

function deleteVote(id) {
    let query = `DELETE FROM Votes 
                 WHERE voteId = "${id}"`

    db.run(query, function(err){
        if(err) throw err
        console.log(`data has been deleted`);
    })
}

// RELEASE 3
// NUMBER 1
function number1() {
    let query = `select name,party,grade_current from Politicians
                 where party = 'R' AND 
                 grade_current < 11 AND grade_current > 9`

    db.run(query, function(err){
        if(err) throw err
    })
}

// NUMBER 2
function number2() {
    let query = `select COUNT(*) AS totalVote,name from Politicians INNER JOIN Votes
    ON Politicians.politicianId = Votes.politicianId
    WHERE Politicians.name = 'Olympia Snowe'`

    db.run(query, function(err){
        if(err) throw err
    })
}

// NUMBER 3
function number3() {
    let query = `select name,COUNT(*) AS totalVote from Politicians inner join Votes
                 on Politicians.politicianId = Votes.politicianId
                 where Politicians.name like 'Adam%'
                 group by Politicians.name`

    db.run(query, function(err){
        if(err) throw err
    })                 
}

// NUMBER 4
function number4() {
    let query = `select COUNT(*) as totalVote,name,party,location from Politicians inner join Votes on
                 Politicians.politicianId = Votes.politicianId
                 group by name
                 order by totalVote desc
                 limit 3`

    db.run(query, function(err){
        if(err) throw err
    })  
}

// NUMBER 5
function number5() {
    let query = `SELECT first_name,last_name,gender,age FROM Voters inner join Votes on
                 Voters.voterId = Votes.voterId
                 inner join Politicians on
                 Votes.politicianId = Politicians.politicianId
                 where Politicians.name = 'Olympia Snowe'`

    db.run(query, function(err){
        if(err) throw err
    })  
}



// updatePolitician('wisnu gautama','PDI','Denpasar',12,21)
// insertPolitician('wisnu','PDI','Denpasar',12)
// deletePolitician(21)

// addPolitician()
// addVoter()
// addVote()