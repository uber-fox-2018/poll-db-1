var fs = require('fs')
var db = require('./setup.js')


class ModelPoliticians {
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

    static insertPoliticians() {
        let dataInsert = this.read("./politicians.csv")
        for (let i = 0; i < dataInsert.length; i++) {

            let query = `INSERT INTO Politicians (name,party,location,grade_current)
                VALUES ('${dataInsert[i][0]}', '${dataInsert[i][1]}', '${dataInsert[i][2]}','${dataInsert[i][3]}')`;

            db.run(query, () => {

                console.log('Successfully created a new row!');
            });
        }
    }

    static add(data) {
        let query = `INSERT INTO Politicians (name,party,location,grade_current)
                VALUES ('${data[0]}', '${data[1]}', '${data[2]}','${data[3]}')`;

        db.run(query, () => {
            console.log('Successfully created a new row!');
        });
    }

    static update(data) {
        
        let query = `UPDATE Politicians 
            SET name = "${data[1]}", party = "${data[2]}", location = "${data[3]}", grade_current = "${data[4]}"
        WHERE id = "${data[0]}"`;

        db.run(query, () => {
            console.log('Successfully update Politicians data!');
        });
    }

    static delete(data) {
        
        let query = `DELETE FROM Politicians
        WHERE id = "${data[0]}"`;

        db.run(query, () => {
            console.log('Successfully delete Politicians data!');
        });
    }

    static show(data,cb){
        let query = `SELECT name,party,grade_current FROM Politicians
        WHERE party = "${data[0]}" AND grade_current between "${data[1]}" AND ${data[2]}`;

        db.all(query, (err,data) => {
            if(err){
                throw err
            }

            cb(data)
        });
    }
}

module.exports = ModelPoliticians