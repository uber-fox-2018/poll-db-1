const fs = require('fs')
const db = require('./db')

class SeedData {
  static insertDataPolitician() {
    let dataPoliticians = fs.readFileSync('politicians.csv', 'utf-8').split('\n');

    for (let i = 1; i < dataPoliticians.length; i++) {
      let dataSplit = dataPoliticians[i].split(',')
      let name = dataSplit[0]
      let party = dataSplit[1]
      let location = dataSplit[2]
      let grade_current = dataSplit[3]

      let queryInsertPoliticians = `INSERT INTO Politicians (name, party, location, grade_current)
                                    VALUES ("${name}", "${party}", "${location}", "${grade_current}")`
      db.run(queryInsertPoliticians, (err) => {
        if (err) throw err
        console.log("Data politicians successfully add to database")
      })
    }
  }

  static insertDataVoters() {
    let dataVoters = fs.readFileSync('voters.csv', 'utf-8').split('\n');

    for (let i = 1; i < dataVoters.length; i++) {
      let dataSplit = dataVoters[i].split(",");

      let first_name = dataSplit[0]
      let last_name = dataSplit[1]
      let gender = dataSplit[2]
      let age = dataSplit[3]

      let queryInsertVoters = `INSERT INTO Voters (first_name, last_name, gender, age)
                               VALUES ("${first_name}", "${last_name}", "${gender}", "${age}")`
      db.run(queryInsertVoters, (err) => {
        if (err) throw err;
        console.log("Data voters successfully add to database")
      })
    }
  }

  static insertDataVotes() {
    let dataVotes = fs.readFileSync('votes.csv', 'utf-8').split('\n');

    for (let i = 1; i < dataVotes.length; i++) {
      let dataSplit = dataVotes[i].split(',')

      let voter_id = dataSplit[0]
      let politician_id = dataSplit[1]

      let queryInsertVotes = `INSERT INTO Votes (voter_id, politician_id)
                              VALUES ("${voter_id}", "${politician_id}")`
      db.run(queryInsertVotes, (err) => {
        if (err) throw err
        console.log("Data votes successfully add to database")
      })
    }
  }
}

SeedData.insertDataPolitician()
SeedData.insertDataVoters()
SeedData.insertDataVotes()