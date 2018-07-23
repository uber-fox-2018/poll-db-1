const db = require('./db')
const fs = require('fs')

// =====================================

// Release 1

// =====================================

function seedData() {
    let politiciansData = fs.readFileSync('politicians.csv').toString().split('\n')
    let votesData = fs.readFileSync('votes.csv').toString().split('\n')
    let votersData = fs.readFileSync('voters.csv').toString().split('\n')

    let new_politicians_Data = []
    let new_votes_Data = []
    let new_voters_Data = []

    for (let i = 0; i < politiciansData.length-1; i++) {
        let data = politiciansData[i].split(',')
        new_politicians_Data.push(data)
    }

    for (let i = 0; i < votesData.length-1; i++) {
        let data = votesData[i].split(',')
        new_votes_Data.push(data)
    }

    for (let i = 0; i < votersData.length-1; i++) {
        let data = votersData[i].split(',')
        new_voters_Data.push(data)
    }

    for (let i = 1; i < new_politicians_Data.length; i++) {
        db.run(`INSERT INTO Politicians (name,party,location,grade_current) VALUES("${new_politicians_Data[i][0]}", "${new_politicians_Data[i][1]}", "${new_politicians_Data[i][2]}", "${new_politicians_Data[i][3]}")`, function(err) {
            if (err) throw err
        })
    }

    for (let i = 1; i < new_votes_Data.length; i++) {
        db.run(`INSERT INTO Votes (voterID,politicianID) VALUES ("${new_votes_Data[i][0]}", "${new_votes_Data[i][1]}")`, function(err) {
            if (err) throw err
        })
    }

    for (let i = 1; i < new_voters_Data.length; i++) {
        db.run(`INSERT INTO Voters (first_name,last_name,gender,age) VALUES ("${new_voters_Data[i][0]}", "${new_voters_Data[i][1]}", "${new_voters_Data[i][2]}", "${new_voters_Data[i][3]}")`, function(err) {
            if (err) throw err
        })
    }
}

// seedData()

// =====================================

// release 2

// =====================================

function insert_data_politician(name, party, location, grade_current) {
   let inputPolitician = `INSERT INTO Politicians (name, party, location, grade_current) VALUES ("${name}", "${party}", "${location}", "${grade_current}")`
   db.run(inputPolitician, function(err) {
       if (err) throw err
   })
}

function insert_data_voter(first_name, last_name, gender, age) {
    let inputVoter = `INSERT INTO Voters (first_name, last_name, gender, age) VALUES ("${first_name}", "${last_name}", "${gender}", "${age}")`
    db.run(inputVoter, function(err) {
        if (err) throw err
    })
}

function insert_data_vote(politicianID, voterID) {
    let inputVote = `INSERT INTO Votes (politicianID, voterID) VALUES ("${politicianID}", "${voterID}")`
    db.run(inputVote, function(err) {
        if (err) throw err
    })
}

// insert_data_politician('Andre Sudi', 'Hacktiv', 'EU', 666.666)
// insert_data_voter('Barrack', 'Obamskuy', 'male', 50)
// insert_data_vote(5,6)

function update_data_politician(id, column, newValue) {
    let update = `UPDATE Politicians SET ${column} = "${newValue}" WHERE politicianID = "${id}"`
    db.run(update, function(err) {
        if (err) throw err
    })
}

function update_data_voter(id, column, newValue) {
    let update = `UPDATE Voters SET ${column} = "${newValue}" WHERE voterID = "${id}"`
    db.run(update, function(err) {
        if (err) throw err
    })
}

function update_data_vote(id, column, newValue) {
    let update = `UPDATE Votes SET ${column} = "${newValue}" WHERE voteID = "${id}"`
    db.run(update, function(err) {
        if (err) throw err
    })
}

// update_data_politician(41, 'name', 'Angela Merkel')
// update_data_voter(151, "last_name", "Sudi")
// update_data_vote(164, "politicianID", 10)

function delete_data_politician(id) {
    let deleteData = `DELETE FROM Politicians WHERE politicianID = "${id}"`
    db.run(deleteData, function(err) {
        if (err) throw err
    })
}

function delete_data_voter(id) {
    let deleteData = `DELETE FROM Voters WHERE voterID = "${id}"`
    db.run(deleteData, function(err) {
        if (err) throw err
    })
}

function delete_data_votes(id) {
    let deleteData = `DELETE FROM Votes WHERE voteID = "${id}"`
    db.run(deleteData, function(err) {
        if (err) throw err
    })
}

// delete_data_politician(42)
// delete_data_politician(43)
// delete_data_politician(44)
// delete_data_politician(45)

// delete_data_voter(152)
// delete_data_voter(153)

// delete_data_votes(165)

// =====================================

// Release 3

// =====================================

// 1
function show_Politician_in_party_R() {
    let queryShowData = `SELECT name, party, grade_current FROM Politicians WHERE party = "R" AND grade_current BETWEEN 9 AND 11`
    db.all(queryShowData, function(err, rows) {
        if (err) throw err
        console.table(rows)
    })
}

show_Politician_in_party_R()

// 2 
function totalVote_Olympia() {
    let queryTotalVotes = `SELECT COUNT (*) AS totalVotes, name FROM Politicians INNER JOIN Votes ON Politicians.politicianID = Votes.politicianID WHERE name = "Olympia Snowe"`
    db.all(queryTotalVotes, function(err, data) {
        if (err) throw err
        console.table(data)
    })
}

totalVote_Olympia()

// 3
function show_Adam() {
    let query_Show_Adam = `SELECT COUNT(*) AS totalVotes, name FROM Politicians 
                        INNER JOIN Votes ON Politicians.politicianID = Votes.politicianID
                        WHERE name LIKE 'Adam%'
                        GROUP BY name`
    db.all(query_Show_Adam, function(err, data) {
        if (err) throw err
        console.table(data)
    })
}

show_Adam()

// 4
function most_totalVote() {
    let query_most_totalVote = `SELECT COUNT(*) AS totalVote, name, party, location FROM Politicians 
                                INNER JOIN Votes ON Politicians.politicianID = Votes.politicianID
                                GROUP BY name
                                ORDER BY totalVote DESC
                                LIMIT 3`

    db.all(query_most_totalVote, function(err, data) {
        if (err) throw err
        console.table(data)
    })
}

most_totalVote()

// 5
function vote_Olympia() {
    let query_vote_Olympia = `SELECT first_name, last_name, gender, age FROM Voters
                                INNER JOIN Votes ON Votes.voterID = Voters.voterID
                                INNER JOIN Politicians ON Votes.politicianID = Politicians.politicianID
                                WHERE name = 'Olympia Snowe'`

    db.all(query_vote_Olympia, function(err,data) {
        if (err) throw err
        console.table(data)
    })
}

vote_Olympia()
