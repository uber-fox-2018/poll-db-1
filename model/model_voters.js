const db = require('../db')

class Voter {
  static insert(data, callback) {
    let queryInsert = `INSERT INTO Voters (first_name, last_name, gender, age)
                       VALUE ("${data[0]}", "${data[1]}", "${data[2]}", "${data[3]}")`
    let message = 'Data successfully add to database'

    db.run(queryInsert, (err) => {
      if (err) throw err;
      callback(message)
    })
  }

  static remove(data, callback) {
    let id = data[0].split(':')[1]
    let queryDelete = `DELETE FROM Voters WHERE id = ${id}`
    let message = `Data with id ${id} successfully deleted`

    db.run(queryDelete, (err) => {
      if (err) throw err;
      callback(message)
    })
  }
}

module.exports = Voter