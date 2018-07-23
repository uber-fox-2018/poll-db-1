const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/database.db')

class Politicians {

    static create (name, party, location, grade_current, callback){
        let query = `INSERT INTO Politicians
                    (name, party, location, grade_current)
                    VALUES ("${name}", "${party}", "${location}", "${grade_current}")`
        db.serialize(() => {
            db.run(query, (err) => {
                if(err) throw err
            })
        })
        callback(`Table politicians has been successfull to created ${name}`)
    }

    static update (id, name, party, location, grade_current, callback) {
        let query = `UPDATE Politicians
                     SET name = "${name}", party = "${party}", location = "${location}", grade_current = "${grade_current}"
                     WHERE id = ${id}` 
        
        db.serialize(() => {
            db.run(query, (err) => {
                if(err) throw err
            })
        })
        callback(`Table politicians has been successfull to updated ${name}`)
    }

    static delete (id, callback) {
        let query = `DELETE FROM Politicians
                     WHERE id = ${id}`

        db.serialize(() => {
            db.run(query, (err) => {
                if(err) throw err
            })
        })
        callback(`Table politicians has been successfull to deleted id : ${id}`)
    }

    static find( party, num1, num2, callback) {
        let query = `SELECT name, party, grade_current
                     FROM politicians
                     WHERE party = "${party}" AND grade_current BETWEEN ${num1} AND ${num2}
                     ORDER BY name ASC;`

        db.all(query, (err, data) => {
            if(err) throw err;
            callback(data)
        })
    }

    static findTotal(name, callback) {
        let query = `SELECT name, COUNT(*) AS totalVote FROM Politicians
                     INNER JOIN Votes
                     ON Politicians.id = Votes.politicianId
                     WHERE Politicians.name LIKE "${name}%"
                     GROUP BY Politicians.name;`

        db.all(query, (err, data) => {
            if(err) throw err;
            callback(data)
        })
    }

    static findVotersAdam(name, callback) {
        let query = `SELECT name, COUNT(*) AS totalVote FROM Politicians
                     INNER JOIN votes
                     ON Politicians.id = Votes.politicianId
                     WHERE Politicians.name LIKE "${name}%"
                     GROUP BY Politicians.name;`
        
        db.all(query, (err, data) => {
            if(err) throw err;
            callback(data)
        })
    }

    static findTop(callback) {
        let query = `SELECT COUNT(*) AS totalVote, name, party, location FROM Politicians
                     INNER JOIN Votes
                     ON Politicians.id = Votes.politicianId
                     GROUP BY Politicians.name
                     ORDER BY totalVote DESC
                     LIMIT 3;`
        
        db.all(query, (err, data) => {
            if(err) throw err;
            callback(data)
        })
    }

    static findVoting(name, callback) {
        let query = `SELECT first_name, last_name, gender, age FROM Votes
                     INNER JOIN Voters
  	                 ON Voters.id = Votes.voterId
                     INNER JOIN Politicians
  	                 ON Politicians.id = Votes.politicianId
                     WHERE Politicians.name = "${name}";`

        db.all(query, (err, data) => {
            if(err) throw err;
            callback(data)
        })
    }


}

module.exports = Politicians;