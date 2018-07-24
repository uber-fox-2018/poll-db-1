const DbContext = require('../model/db_context');

class Controller {
    constructor() {
        this.model = new DbContext('./poll-db.db');
    }

    queryHandler(sql) {
        this.model.query(sql, (err, rows) => {
            if (err)
                console.log('Error.', err);
            else
                console.log(rows);
        });
    }

    politicians_with_party_R_grade_9_to_11() {
        let sql = "SELECT name, party, grade_current"
        sql += " FROM politicians"
        sql += " WHERE party = 'R'"
        sql += " AND grade_current BETWEEN 9 AND 11;";
        this.queryHandler(sql);
    }

    total_vote_for_olympia_snowe() {
        let sql = "SELECT count(v.id) AS 'totalVote', p.name"
        sql += " FROM politicians p";
        sql += " JOIN votes v";
        sql += " ON p.id = v.politicianId";
        sql += " WHERE p.name = 'Olympia Snowe';";
        this.queryHandler(sql);
    }

    total_vote_for_names_contains_adam() {
        let sql = "SELECT p.name, count(v.id) AS 'totalVote'";
        sql += " FROM politicians p";
        sql += " JOIN votes v";
        sql += " ON p.id = v.politicianId";
        sql += " WHERE p.name LIKE '%Adam%'";
        sql += " GROUP BY 1;";
        this.queryHandler(sql);
    }

    three_politicians_with_highest_votes() {
        let sql = "SELECT count(v.id) AS 'totalVote', p.name, p.party, p.location"
        sql += " FROM politicians p";
        sql += " JOIN votes v";
        sql += " ON p.id = v.politicianId";
        sql += " GROUP BY p.name";
        sql += " ORDER BY 1 DESC";
        sql += " LIMIT 3;"
        this.queryHandler(sql);
    }

    voters_who_vote_for_olympia_snowe() {
        let sql = "SELECT first_name, last_name, gender, age";
        sql += " FROM voters";
        sql += " JOIN votes ON voters.id = votes.voterId";
        sql += " JOIN politicians p ON votes.politicianId = p.id";
        sql += " WHERE p.name = 'Olympia Snowe';"
        this.queryHandler(sql);
    }

    help() {
        console.log(`node index.js query <option>`);
        console.log(`1. Politicians on party pary 'R' with grade between 9 and 11.`);
        console.log(`2. Total vote for politician 'Olympia Snowe'.`);
        console.log(`3. Total vote for politician names that contains 'Adam'.`);
        console.log(`4. Three politicians with highest votes.`);
        console.log(`5. Voters who vote for 'Olympia Snowe'.`);
    }
}

module.exports = Controller;