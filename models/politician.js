const db = require('../db.js');

class Politician {

    static createDataPolitician(name, party, location, grade_current) {
        let queryCreatePolitician = `INSERT INTO Politicians (name, party, location, grade_current)
                                     VALUES ("${name}", "${party}", "${location}", "${grade_current}")`;
        db.run(queryCreatePolitician, function (err) {
            if (err) throw err
            console.log(`New Politician "${name}" has been added!`)
        })
    }

    static updatePoliticianData(id, column_edited, value_edited) {
        let queryUpdatePolitician = `UPDATE Politicians SET "${column_edited}" = "${value_edited}"
                                     WHERE id = "${id}"`;
        db.run(queryUpdatePolitician, function (err) {
            if (err) throw err
            console.log(`Updated Politician with ID "${id}".`)
        })
    }

    static deletePolitician(id) {
        let queryDeletePolitician = `DELETE FROM Politicians WHERE id = "${id}"`;
        db.run(queryDeletePolitician, function (err) {
            if (err) throw err
            console.log(`Politician with ID "${id}" has been deleted from the record.`)
        })
    }

    /*
    Release 3 No.1
    Tampilkan nama politician, partai dan grade_current politician tersebut
    yang berada di partai R dan memiliki grade_current range 9 s/d 11
    */
    static filterOne() {
        const queryfilterOne = `SELECT * FROM Politicians
                                WHERE party = "R"
                                AND grade_current BETWEEN 9 AND 11`;
        db.all(queryfilterOne, function (err, data) {
            if (err) throw err
            console.table(data);
        })
    }

    /*
    Release 3 No.2
    Hitung jumlah vote untuk politician yang bernama Olympia Snowe.
    */
    static filterTwo() {
        const queryfilterTwo = `SELECT COUNT (Politicians.name) AS totalVote, Politicians.name 
                               FROM Politicians
                                    INNER JOIN Votes ON Politicians.id = Votes.politicianId
                               WHERE Politicians.name = "Olympia Snowe"`;
        db.all(queryfilterTwo, function (err, data) {
            if (err) throw err
            console.table(data);
        })
    }

    /*
    Release 3 No.3
    Hitung jumlah vote untuk politician yang nama-nya mengandung kata Adam.
    */
    static filterThree() {
        const queryfilterThree = `SELECT Politicians.name, 
                                    COUNT (Politicians.name) AS totalVote FROM Politicians
                                 INNER JOIN Votes ON Politicians.id = Votes.politicianId
                                 WHERE Politicians.name LIKE "%Adam%"
                                    GROUP BY Politicians.name`;
        db.all(queryfilterThree, function (err, data) {
            if (err) throw err
            console.table(data);
        })
    }

    /*
    Release 3 No.4
    Tampilkan 3 Politician bserta name partai dan lokasi Politician tersebut,
    yang memiliki suara terbanyak.
    */
    static filterFour() {
        const queryfilterFour = `SELECT COUNT(Politicians.name) AS totalVote, name, party, location 
                                FROM Votes
                                INNER JOIN Politicians
                                    ON Votes.politicianId = Politicians.id
                                GROUP BY Politicians.name
                                    ORDER BY totalVote DESC
                                LIMIT 3`;
        db.all(queryfilterFour, function (err, data) {
            if (err) throw err
            console.table(data);
        })
    }
    /*
    Release 3 No.5
    Tampliklan siapa saja yang melakukan voting ke politician yang bernama Olympia Snowe.
    */
    static filterFive() {
        const queryfilterFive = `SELECT first_name, last_name, gender, age from Voters
                                 INNER JOIN (SELECT * FROM Votes JOIN Politicians ON
                                    votes.politicianId = Politicians.id) AS votes
                                 ON Voters.id = votes.voterId
                                 WHERE Votes.name = "Olympia Snowe"`;
        db.all(queryfilterFive, function (err, data) {
            if (err) throw err
            console.table(data);
        })
    }


}

module.exports = Politician;