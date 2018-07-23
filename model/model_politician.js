const db = require('../db')

class Politician {
  static insert(data, callback) {
    let queryInsert = `INSERT INTO Politicians (name, party, location, grade_current)
    VALUES ("${data[0]}", "${data[1]}", "${data[2]}", "${data[3]}")`
    db.run(queryInsert, (err) => {
      if (err) throw err;
      const message = 'Data successfully add to database'
      callback(message)
    })
  }

  static update(data, callback) {
    let id = data[0].split(':')[1]
    let splitColumn = data[1].split(':')
    let column = splitColumn[0]
    let value = splitColumn[1]
    let queryUpdate = `UPDATE Politicians SET ${column} = "${value}" WHERE id = ${id}`
    let message = `Data with column ${column} and id ${id}  success to updated`
    
    db.run(queryUpdate, (err) => {
      if (err) throw err
      callback(message)
    })
  }

  static remove(data, callback) {
    let id = data[0].split(':')[1]
    let queryDelete = `DELETE FROM Politicians WHERE id = ${id}`
    let message = `Data with id ${id} successfully deleted`

    db.run(queryDelete, (err) => {
      if (err) throw err
      callback(message)
    })
  }

  static listParty(data, callback) {
    let party = data[0]
    let queryListParty = `SELECT name, party, grade_current 
                          FROM Politicians 
                          WHERE party LIKE "%${party}%"
                          AND grade_current >= 9 AND grade_current < 11`
    db.all(queryListParty, (err, data) => {
      if (err) throw err
      callback(data)
    })
  }

  static topVote(data, callback) {
    let limit = data[0].split(':')[1]
    let queryTopVote = `SELECT COUNT(politician_id) AS totalVote, 
                        name, party, location FROM Politicians JOIN Votes ON Politicians.id = Votes.politician_id GROUP BY name ORDER BY totalVote DESC LIMIT ${limit}`

    db.all(queryTopVote, (err, data) => {
      if (err) throw err
      callback(data)
    })
  }

  static hitungVote(data, callback) {
    let name = data[0].split(':')[1]
    let queryHitungVote = `SELECT name, COUNT(politician_id) AS totalVote 
                           FROM Politicians 
                           JOIN Votes 
                            ON Politicians.id = Votes.politician_id 
                           WHERE name LIKE "%${name}%" 
                           GROUP BY name 
                           ORDER BY name ASC `

    db.all(queryHitungVote, (err, data) => {
      if (err) throw err
      callback(data)
    })
  }

  static listVoters(data, callback) {
    let name = data[0].split(':')[1]
    let queryListVoter = `select * from Voters JOIN (select * from Votes JOIN Politicians ON Votes.politician_id = Politicians.id) AS Pemilih ON Voters.id = Pemilih.voter_id where name LIKE "%${name}%";`

    db.all(queryListVoter, (err, data) => {
      if (err) throw err
      callback(data)
    })
  }
}

module.exports = Politician