const db = require('../db.js');

class Voter {

    static createDataVoter(first_name, last_name, gender, age) {
        let queryCreateVoter = `INSERT INTO Voters (first_name, last_name, gender, age)
                                VALUES ("${first_name}", "${last_name}", "${gender}", "${age}")`;
        db.run(queryCreateVoter, function (err) {
            if (err) throw err
            console.log(`New Voter "${first_name} ${last_name}" has been added!`)
        })
    }

    static updateVoterData(id, column_edited, value_edited) {
        let queryUpdateVoter = `UPDATE Voters SET "${column_edited}" = "${value_edited}"
                                WHERE id = "${id}"`;
        db.run(queryUpdateVoter, function (err) {
            if (err) throw err
            console.log(`Updated Voter with ID "${id}"`);
        })
    }

    static deleteVoter(id) {
        let queryDeleteVoter = `DELETE FROM Voters WHERE id = " ${id}"`;
        db.run(queryDeleteVoter, function (err) {
            if (err) throw err
            console.log(`Voter with ID "${id}" has been deleted from the record.`)
        })
    }
}

module.exports = Voter;