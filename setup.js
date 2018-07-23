const db = require('./db')
const fs = require('fs')
var voters = fs.readFileSync('voters.csv').toString().split('\n')
var politicians = fs.readFileSync('politicians.csv').toString().split('\n')
var votes = fs.readFileSync('votes.csv').toString().split('\n')
// let arr = []

function readVoters(){
    for(let i = 1 ; i < voters.length ; i++){
        voters[i] = voters[i].split(',')
        let query = ` INSERT INTO voters (first_name, last_name, gender, age) VALUES ('${voters[i][0]}','${voters[i][1]}','${voters[i][2]}','${Number(voters[i][3])}')`;
        db.serialize(function(){
            db.run(query, function (err) {});
        })
    }
}
// readVoters()
// serialize

function readPoliticians(){
    for(let i = 1 ; i < politicians.length ; i++){
        politicians[i] = politicians[i].split(',')
        let query = ` INSERT INTO politicians (name, party, location, grade_current) VALUES ('${politicians[i][0]}','${politicians[i][1]}','${politicians[i][2]}','${Number(politicians[i][3])}')`;
        db.serialize(function(){
            db.run(query, function (err) {});
        })
    }
}

// readPoliticians()

function readVotes(){
    
    for(let i = 1 ; i < votes.length ; i++){
        votes[i] = votes[i].split(',')
        let query =` INSERT INTO votes (voter_id, politician_id) VALUES ('${Number(votes[i][0])}','${Number(votes[i][1])}')`;
        db.serialize(function(){
            db.run(query,function (err){});
        })
    }

}
// readVotes()


// release 3

// 1. tampilkan nama politician, partai grade_current tersebut yang berada di partai R dan memiliki grade current 9 s/d 11
function party_r_and_grade_current(){
    let query = `SELECT * FROM politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`
    db.all(query,function(err,data){
        console.table(data)
    })
}
// party_r_and_grade_current()



// 2. hitung jumlah vote untuk politician yang bernama Olympia Snowe
function totalOlympiaVote(){
    let query = `SELECT COUNT(*) AS totalVote,name FROM votes join politicians
    ON votes.politician_id = politicians.id
    WHERE politicians.name = 'Olympia Snowe'`
    db.all(query,function(err,data){
        console.table(data)
    })
}
// totalOlympiaVote()


// 3. Hitung jumlah vote untuk politician yang nama-nya mengandung kata Adam
function totalNameLikeAdam(){
    let query = `SELECT COUNT(*),name FROM politicians join votes
    on politicians.id = votes.politician_id
    WHERE politicians.name like 'Adam%'
    GROUP BY politicians.name`
    db.all(query,function(err,data){
        console.table(data)
    })
}
// totalNameLikeAdam()

// 4. tampilkan 3 politician beserta nama partai dan lokasi politician tersebut, yang mwmiliki suara terbanyak

function top3Politician(){
    let query = `SELECT COUNT(*) as totalVote,name FROM politicians join votes
    on politicians.id = votes.politician_id
    group by politicians.name
    order by totalVote desc limit 3`
    db.all(query,function(err,data){
        console.log(data)
    })
}
// top3Politician()

// 5. tampilkan siapa saja yang melakukan voting ke politician yang bernama olympia snowe

function voteOlympia(){
    let query = `select first_name,last_name,gender,age from voters join votes
    on votes.voter_id = voters.id
    where votes.politician_id = (select id from politicians where name = 'Olympia Snowe')`
    db.all(query,function(err,data){
        console.log(data)
    })
}
// voteOlympia()