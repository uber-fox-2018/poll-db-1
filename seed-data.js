var sqlite = require('sqlite3').verbose()
var file = 'pollDB.db'
var db = new sqlite.Database(file)
var fs = require('fs')

// INPUT Politicians//
//1
let politiciansRaw = fs.readFileSync(`./politicians.csv`).toString().split(`\r\n`).slice(1)

//2
var politiciansArr= []
for (var person of politiciansRaw){
    politiciansArr.push(person.split(','))
}

//3
for (let i=0; i<politiciansArr.length; i++) {
    let queryPoliticians = `INSERT INTO politicians (name, party, location, grade_current)
                            VALUES ('${politiciansArr[i][0]}','${politiciansArr[i][1]}','${politiciansArr[i][2]}','${politiciansArr[i][3]}')`;

    db.run(queryPoliticians,(err)=> {
        if(err) throw err;
    });
}


//INPUT Voters//
//1
let votersRaw= fs.readFileSync(`./voters.csv`).toString().split(`\r\n`).slice(1)

//2
var votersArr= []
for (var person of votersRaw){
    votersArr.push(person.split(','))
}

//3
for (let i=0; i<votersArr.length; i++) {
    let queryVoters =   `INSERT INTO voters (first_name, last_name, gender, age)
                        VALUES ("${votersArr[i][0]}","${votersArr[i][1]}","${votersArr[i][2]}","${votersArr[i][3]}")`;
    
    db.run(queryVoters,(err)=> {
        if(err) throw err;
    });
}


//INPUT Votes//
//1
let votesRaw= fs.readFileSync(`./votes.csv`).toString().split(`\r\n`).slice(1)

//2
var votesArr= []
for (var person of votesRaw){
    votesArr.push(person.split(','))
}

//3
for (let i=0; i<votesArr.length; i++) {
    let queryVotes =   `INSERT INTO votes (voter_id, politician_id)
                        VALUES ("${votesArr[i][0]}","${votesArr[i][1]}")`;
    
    db.run(queryVotes,(err)=> {
        if(err) throw err;
    });
}


