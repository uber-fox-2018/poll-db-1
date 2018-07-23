const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/database.db')

class Voters {

    static create (first_name, last_name, gender, age, callback){
        let query = `INSERT INTO Voters
                    (first_name, last_name, gender, age)
                    VALUES ("${first_name}", "${last_name}", "${gender}", "${age}")`
        db.serialize(() => {
            db.run(query, (err) => {
                if(err) throw err
            })
        })
        callback(`Table voters has been successfull to created ${first_name} ${last_name}`)
    }

    static update (id, first_name, last_name, gender, age,callback) {
        let query = `UPDATE Voters
                     SET first_name = "${first_name}", last_name = "${last_name}", gender = "${gender}", age = "${age}"
                     WHERE id = ${id}` 
        
        db.serialize(() => {
            db.run(query, (err) => {
                if(err) throw err
            })
        })
        callback(`Table voters has been successfull to updated ${first_name} ${last_name}`)
    }

    static delete (id, callback) {
        let query = `DELETE FROM Voters
                     WHERE id = ${id}`

        db.serialize(() => {
            db.run(query, (err) => {
                if(err) throw err
            })
        })
        callback(`Table voters has been successfull to deleted id : ${id}`)
    }
}

module.exports = Voters;