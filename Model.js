'use strick'
const db = require('./dbConfig.js');

class Model {

    // Create politician from argv
    static addPolitician(name, party, location, grade_current) {
        let query = `INSERT INTO politicians (name, party, location, grade_current)
                    VALUES ("${name}", "${party}", "${location}", "${grade_current}")`;
        db.run(query, (err) => {
            if (err) throw err;
        });
    }

    // Read politician from argv
    static readingPolitician(dataQuery) {
        let query = `SELECT * FROM politicians`;
        db.all(query, (err, data) => {
            dataQuery(data);
        })
    }

    // Insert voter from argv
    static addVoter(first_name, last_name, gender, age) {
        let query = `INSERT INTO voters (first_name, last_name, gender, age)
                        VALUES ("${first_name}", "${last_name}", "${gender}", "${age}")`;
        db.run(query, (err) => {
            if (err) throw err;
        });
    }

    // Inser vote from argv
    static addVote(voter_id, politician_id) {
        let query = `INSERT INTO votes (voter_id, politician_id)
                    VALUES ("${voter_id}", "${politician_id}")`;
        db.run(query, (err) => {
            if (err) throw err;
        });
    }   
    
}

module.exports = Model