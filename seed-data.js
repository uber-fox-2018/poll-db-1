const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('pollDB1', function(err){
    if(err){
        return console.error(err.message)
    }
    
    console.log(`Connected to the in-memory SQlite database.`)
})


var politicians = fs.readFileSync(`./politicians.csv`,'utf8').split('\n')
db.serialize(function(){
    for(var i = 1; i < politicians.length-1;i++){
        var politiciansParse = politicians[i].split(',')
        var query = `INSERT INTO politicians VALUES (null,'${politiciansParse[0]}','${politiciansParse[1]}','${politiciansParse[2]}',${politiciansParse[3]})`
        db.run(query)
    }
})

var voters = fs.readFileSync('./voters.csv','utf8').split('\n')
db.serialize(() =>{
    for(var i = 1; i < voters.length;i++){
        var parsingVoters = voters[i].split(',')
        var query = `INSERT INTO voters VALUES (null, "${parsingVoters[0]}","${parsingVoters[1]}","${parsingVoters[2]}","${parsingVoters[3]}")`
        db.run(query)
    }

})

var votes = fs.readFileSync('./votes.csv','utf8').split('\n')
db.serialize(()=>{
    for(var i = 1; i < votes.length;i++){
        var parsingVotes = votes[i].split(',')
        var query = `INSERT INTO votes VALUES (null,'${parsingVotes[0]}','${parsingVotes[1]}');`
        db.run(query)
    }

})








