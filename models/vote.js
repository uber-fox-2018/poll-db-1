const db = require('../db.js');

class Vote {

    static createDataVotes(voterId, politicianId) {
        let queryCreateVote = `INSERT INTO Votes (voterId, politicianId)
                               VALUES ("${voterId}", "${politicianId}")`;
        db.run(queryCreateVote, function (err) {
            if (err) throw err
            console.log(`New Vote has been created!`);
        })
    }

    static updateVoteData(id, column_edited, value_edited) {
        let queryUpdateVote = `UPDATE Votes SET "${column_edited}" = "${value_edited}"
                               WHERE id = "${id}"`;
        db.run(queryUpdateVote, function (err) {
            if (err) throw err
            console.log(`Vote ID "${id}" has been updated!`);
        })
    }

    static deleteVote(id) {
        let queryDeleteVote = `DELETE FROM Votes WHERE id = "${id}"`;
        db.run(queryDeleteVote, function (err) {
            if (err) throw err
            console.log(`Vote ID "${id}" has been deleted from the record.`);
        })
    }
}

module.exports = Vote;