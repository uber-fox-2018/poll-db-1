const db = require('./db.js');
const fs = require('fs');

let politiciansData = fs.readFileSync('./politicians.csv', 'utf8').split('\n');
let votersData = fs.readFileSync('./voters.csv', 'utf8').split('\n');
let votesData = fs.readFileSync('./votes.csv', 'utf8').split('\n');

for (let i = 1; i < politiciansData.length - 1; i++) {
    let data = politiciansData[i].split(',');
    var name = data[0];
    var party = data[1];
    var location = data[2];
    var grade_current = data[3];

    let queryPoliticianData = `INSERT INTO Politicians (name, party, location, grade_current)
                               VALUES ("${name}", "${party}", "${location}", "${grade_current}")`;

    db.serialize(function () {
        db.run(queryPoliticianData, function (err) {
            if (err) throw err
        })
    })
}

for (let i = 1; i < votersData.length - 1; i++) {
    let data = votersData[i].split(',');
    var first_name = data[0];
    var last_name = data[1];
    var gender = data[2];
    var age = data[3];

    let queryVotersData = `INSERT INTO Voters (first_name, last_name, gender, age)
                           VALUES ("${first_name}", "${last_name}", "${gender}", "${age}")`;

    db.serialize(function () {
        db.run(queryVotersData, function (err) {
            if (err) throw err
        })
    })
}

for (let i = 1; i < votesData.length - 1; i++) {
    let data = votesData[i].split(',');
    var voterId = data[0];
    var politicianId = data[1];

    let queryVotesData = `INSERT INTO Votes (voterId, politicianId)
                          VALUES ("${voterId}", "${politicianId}")`;


    db.serialize(function () {
        db.run(queryVotesData, function (err) {
            if (err) throw err
        })
    })
}