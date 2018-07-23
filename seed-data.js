const db = require('./db')
const fs = require('fs')

function read(file){
    let data = fs.readFileSync(file,'utf8')
    let arrData = data.split('\n')
    let result = []
    arrData.forEach(data=>{
        result.push(data.split(','))
    })
    result.pop()
    result.shift()
    return result
}

let politicianData = read('./politicians.csv')

let votersData = read('./voters.csv')

let votesData = read('./votes.csv')

// for (let i = 0; i < politicianData.length; i++){
//     let insertPol = `INSERT INTO politicians (name, party, location, grade_current)
//                      VALUES('${politicianData[i][0]}', '${politicianData[i][1]}', '${politicianData[i][2]}', '${politicianData[i][3]}')
//     `
//     db.serialize(()=>{
//         db.run(insertPol, function(err){
//             if (err) throw err
//         })
//     })
// }

// for (let i = 0; i < votersData.length;i++){
//     let insertVoters = `INSERT INTO voters (first_name, last_name, gender, age)
//                         VALUES ('${votersData[i][0]}', "${votersData[i][1]}", '${votersData[i][2]}', '${votersData[i][3]}')
//     `

//     db.serialize(()=>{
//         db.run(insertVoters, function(err){
//             if (err) throw err
//         })
//     })
// }

// for (let i = 0; i < votesData.length;i++){
//     let insertVotes = `INSERT INTO votes (voters_id, politicians_id)
//                         VALUES ('${votesData[i][0]}', "${votesData[i][1]}")
//     `

//     db.serialize(()=>{
//         db.run(insertVotes, function(err){
//             if (err) throw err
//         })
//     })
// }

function insertPoliticians(name,party,location){
    let query = `INSERT INTO politicians (name, party, location)
                 VALUES("${name}", "${party}", "${location}")
    `
    db.run(query, (err)=>{
        if (err) throw err
    })
}

function insertVoters(first_name,last_name,gender,age){
    let query = `INSERT INTO voters (first_name, last_name, gender, age)
                 VALUES ('${first_name}', "${last_name}", '${gender}', '${age}')
    `

    db.run(query, (err)=>{
        if (err) throw err
    })
}

function insertVotes(voters_id, politicians_id){
    let query = `INSERT INTO votes (voters_id, politicians_id)
                 VALUES ('${voters_id}', "${politicians_id}")
    `
    db.run(query, (err)=>{
        if (err) throw err
    })
}

function updateDb(table,column_name,column_value,id){
    let query = `UPDATE ${table}
                 SET ${column_name} = '${column_value}'
                 WHERE id = ${id}
    `

    db.run(query,(err)=>{
        if (err) throw err
    })
}

function deleteDb(table,id){
    let query = `DELETE FROM ${table}
                 WHERE id = ${id}
    `
    db.run(query, (err)=>{
        if (err) throw err
    })
}

// insertPoliticians('Jon','stark','winterfell')
// deleteDb('politicians','21')

// updateDb('politicians','name','rob',21)

let query1 = `SELECT name,party,grade_current
              FROM politicians
              WHERE party = 'R'
              AND grade_current between 9 AND 11
              ORDER BY grade_current ASC`
              
let query2 = `SELECT COUNT(*) AS totalVote,name
              FROM politicians
              INNER JOIN votes
              ON politicians.id = votes.politicians_id
              WHERE name = 'Olympia Snowe'`


let query3 = `SELECT name,COUNT (*) AS totalVotes
              FROM politicians
              INNER JOIN votes
              ON politicians.id = votes.politicians_id
              WHERE name LIKE 'Adam%'
              GROUP BY name`


let query4 = `SELECT COUNT(*) AS totalVote, name, party, location
              FROM politicians
              INNER JOIN votes
              ON politicians.id = votes.politicians_id
              GROUP BY name
              ORDER BY totalVote DESC
              LIMIT 3`

let query5 = `SELECT first_name, last_name, gender, age
              FROM voters
              INNER JOIN votes
              ON voters.id = votes.voters_id
              INNER JOIN politicians
              ON politicians.id = votes.politicians_id
              WHERE politicians.name = 'Olympia Snowe'`

db.all(query5,(err,data)=>{
    console.log(data)
})


