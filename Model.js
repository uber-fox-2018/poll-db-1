'use strick'
const fs = require('fs');
const db = require('./setup.js');

class Model {

    // add politician from argv
    static addPolitician(name, party, location, grade_current) {
        let query = `INSERT INTO politicians (name, party, location, grade_current)
                    VALUES ("${name}", "${party}", "${location}", "${grade_current}")`;
        db.run(query, function (err) {
            if (err) throw err;
        });
    }

    // add voter from argv
    static addVoter(first_name, last_name, gender, age) {
        let query = `INSERT INTO voters (first_name, last_name, gender, age)
                        VALUES ("${first_name}", "${last_name}", "${gender}", "${age}")`;
        db.run(query, (err) => {
            if (err) throw err;
        });
    }

    static addVote(voter_id, politician_id) {
        let query = `INSERT INTO votes (voter_id, politician_id)
                    VALUES ("${voter_id}", "${politician_id}")`;
        db.run(query, function (err) {
            if (err) throw err;
        });
    }

    // baca data dari csv politicians
    static ReadPoliticians() {
        let politicians = fs.readFileSync('./politicians.csv', 'utf8');
        let politicanarr = politicians.split('\n');
        let dataPoliticians = [];
        for(let i in politicanarr) {
            dataPoliticians.push(politicanarr[i].split(','));
        }
        return dataPoliticians
    }

    // tulis data dari csv ke sqlite politicians
    static WriteFromCSVPoliticians(data) {
        for(let i = 1; i < data.length; i++) {
            let query = `INSERT INTO politicians (name, party, location, grade_current)
                        VALUES ("${data[i][0]}", "${data[i][1]}", "${data[i][2]}", "${data[i][3]}")`;
            db.run(query, function (err) {
                if (err) throw err;
            });
        }
    }

    // baca data dari csv voters
    static ReadVoters() {
        let voters = fs.readFileSync('./voters.csv', 'utf8');
        let voterarr = voters.split('\n');
        let datavoters = [];
        for(let i in voterarr) {
            datavoters.push(voterarr[i].split(','));
        }
        return datavoters
    }

    // tulis data dari csv ke sqlite voters
    static WriteFromCSVVoters(data) {
        for(let i = 1; i < data.length; i++) {
            let query = `INSERT INTO voters (first_name, last_name, gender, age)
                        VALUES ("${data[i][0]}", "${data[i][1]}", "${data[i][2]}", "${data[i][3]}")`;
            db.run(query, (err) => {
                if (err) throw err;
            });
        }
    }

    // baca file csv votes
    static ReadVotes() {
        let votes = fs.readFileSync('./votes.csv', 'utf8');
        let votearr = votes.split('\n');
        let datavotes = [];
        for(let i in votearr) {
            datavotes.push(votearr[i].split(','));
        }
        return datavotes
    }

    // tulis data dari csv ke sqlite votes
    static WriteFromCSVVotes(data) {
        for(let i = 1; i < data.length; i++) {
            let query = `INSERT INTO votes (voter_id, politician_id)
                        VALUES ("${data[i][0]}", "${data[i][1]}")`;
            db.run(query, (err) => {
                if (err) throw err;
            });
        }
    }

    
    
}

module.exports = Model