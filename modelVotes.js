var fs = require('fs')
var db = require('./setup.js')


class ModelVotes {
    static write(data) {
        fs.writeFileSync(data, "utf8")
    }

    static read(data) {
        let dataString = fs.readFileSync(data, "utf8")
        let dataArray = dataString.split("\r\n")
        let allData = []
        for (let i = 1; i < dataArray.length; i++) {
            allData.push(dataArray[i].split(','))
        }
        return allData
    }

    static delete() {

    }

    static add(data) {
        //name,party,location,grade_current
        let dataArr = this.read("./politicians.csv")
        console.log(dataArr)

    }
    static insertToVotes() {
        let dataInsert = this.read("./votes.csv")

        for (let i = 0; i < dataInsert.length; i++) {

            let query = `INSERT INTO Votes (voterId,politicianId)
                VALUES ('${dataInsert[i][0]}', '${dataInsert[i][1]}')`;

            db.run(query, () => {

                console.log('Successfully created a new row!');
            });
        }
    }

    static add(data) {
        let query = `INSERT INTO Votes (voterId,politicianId)
                VALUES ('${data[0]}', '${data[1]}')`;

        db.run(query, () => {
            console.log('Successfully created a new row!');
        });

    }

    static update(data) {

        let query = `UPDATE Votes 
            SET voterId = "${data[1]}", politicianId = "${data[2]}"
        WHERE id = "${data[0]}"`;

        db.run(query, () => {
            console.log('Successfully update votes data!');
        });
    }

    static delete(data) {

        let query = `DELETE FROM Votes
        WHERE id = "${data[0]}"`;

        db.run(query, () => {
            console.log('Successfully update votes data!');
        });
    }

    static countVotes(data, cb) {

        let query = `select count(name) as totalVote,name FROM Politicians 
        inner join Votes 
        ON Votes.politicianId = Politicians.id
        WHERE name = "${data[0]}" `;

        db.all(query, (err, result) => {
            cb(result)
        });
    }
    static countVotesLike(cb) {

        let query = `select name,count() as totalVotes FROM Politicians as p
        join Votes as v
        ON p.id = v.politicianID
        WHERE name like "Adam%" 
        Group by name;
         `;

        db.all(query, (err, result) => {
            cb(result)
        });
    }
    static countVotesTotal(cb) {

        let query = `select Count(*)as totalVote, name, party, location from Politicians
        JOIN Votes on Votes.politicianId = Politicians.id
        group by name order BY totalVote DESC LIMIT 3;
         `;

        db.all(query, (err, result) => {
            cb(result)
        });
    }
    static countVotesPerson(cb) {

        let query = ` select first_name, last_name, gender, age
        from Voters where Voters.id in 
        (select Voters.id from Voters JOIN Votes ON Voters.id = Votes.voterId where Votes.politicianId = 
        (select Politicians.id from Politicians where name = "Olympia Snowe"));`;

        db.all(query, (err, result) => {
            cb(result)
        });
    }
}

module.exports = ModelVotes