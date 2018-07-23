var fs = require('fs')
var db = require('./setup.js')


class ModelVoters {
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
    static insertToVoters() {
        let dataInsert = this.read("./voters.csv")

        for (let i = 0; i < dataInsert.length; i++) {
            let data = `${dataInsert[i][0]},${dataInsert[i][1]},${dataInsert[i][2]},${dataInsert[i][3]}`
            let query = `INSERT INTO Voters (first_name,last_name,gender,age)
                VALUES ('${dataInsert[i][0]}', '${dataInsert[i][1]}', '${dataInsert[i][2]}','${dataInsert[i][3]}')`;

            db.run(query, () => {

                console.log('Successfully created a new row!');
            });
        }
    }

    static add(data) {
        let query = `INSERT INTO Voters (first_name,last_name,gender,age)
                VALUES ('${data[0]}', '${data[1]}', '${data[2]}','${data[3]}')`;

        db.run(query, () => {
            console.log('Successfully created a new row!');
        });
    }

    static update(data) {

        let query = `UPDATE Voters 
            SET first_name = "${data[1]}", last_name = "${data[2]}", gender = "${data[3]}", age = "${data[4]}"
        WHERE id = "${data[0]}"`;

        db.run(query, () => {
            console.log('Successfully update Voters data!');
        });
    }
    /*DELETE FROM Students WHERE StudentId = 11 OR StudentId = 12; */
    static delete(data) {
        
        let query = `DELETE FROM Voters
        WHERE id = "${data[0]}"`;

        db.run(query, () => {
            console.log('Successfully delete Voters data!');
        });
    }
}

module.exports = ModelVoters