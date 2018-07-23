const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/database.db')

class Votes {

    static create (voterId, politicianId, callback){
        let query = `INSERT INTO Votes
                    (voterId, politicianId)
                    VALUES ("${voterId}", "${politicianId}")`
        db.serialize(() => {
            db.run(query, (err) => {
                if(err) throw err
            })
        })
        callback(`Table votes has been successfull to created`)
    }

    static update (id, voterId, politicianId, callback) {
        let query = `UPDATE Votes
                     SET voterId = "${voterId}", politicianId = "${politicianId}"
                     WHERE id = ${id}` 
        
        db.serialize(() => {
            db.run(query, (err) => {
                if(err) throw err
            })
        })
        callback(`Table voters has been successfull to updated ID : ${id}`)
    }

    static delete (id, callback) {
        let query = `DELETE FROM Votes
                     WHERE id = ${id}`

        db.serialize(() => {
            db.run(query, (err) => {
                if(err) throw err
            })
        })
        callback(`Table voters has been successfull to deleted id : ${id}`)
    }
}
module.exports = Votes;