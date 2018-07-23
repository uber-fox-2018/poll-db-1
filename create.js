var fs = require('fs')
const db = require('./setup.js');

class Create {
    constructor(inputDataString) {
        this.dataString = fs.readFileSync(inputDataString, "utf8")
        this.fileContent;
        this.dataArr;
    }

    arrayData() {
        this.fileContent = this.dataString.split("\r\n")
    }

    allData() {
        let allData = []
        let data = this.fileContent

        for (let i = 1; i < data.length; i++) {
            allData.push(data[i].split(','))
        }
        this.dataArr = allData
    }

    insertToPoliticians() {
        this.arrayData()
        this.allData()
        let dataInsert = this.dataArr

        for (let i = 0; i < dataInsert.length; i++) {

            let query = `INSERT INTO Politicians (name,party,location,grade_current)
                VALUES ('${dataInsert[i][0]}', '${dataInsert[i][1]}', '${dataInsert[i][2]}','${dataInsert[i][3]}')`;

            db.run(query, () => {

                console.log('Successfully created a new row!');
            });
        }
    }

    insertToVoters() {
        this.arrayData()
        this.allData()
        let dataInsert = this.dataArr

        for (let i = 0; i < dataInsert.length; i++) {
            let data = `${dataInsert[i][0]},${dataInsert[i][1]},${dataInsert[i][2]},${dataInsert[i][3]}`
            let query = `INSERT INTO Voters (first_name,last_name,gender,age)
                VALUES ('${dataInsert[i][0]}', '${dataInsert[i][1]}', '${dataInsert[i][2]}','${dataInsert[i][3]}')`;

            db.run(query, () => {

                console.log(data);
            });
        }
    }

    insertToVotes() {
        this.arrayData()
        this.allData()
        let dataInsert = this.dataArr
        //voterId   politicianId 
        for (let i = 0; i < dataInsert.length; i++) {

            let query = `INSERT INTO Votes (voterId,politicianId)
                VALUES ('${dataInsert[i][0]}', '${dataInsert[i][1]}')`;

            db.run(query, () => {

                console.log('Successfully created a new row!');
            });
        }
    }
}

// var politicians = new Create("./politicians.csv")
// politicians.insertToPoliticians()
// var voters = new Create("./voters.csv")
// voters.insertToVoters()
// var votes = new Create("./votes.csv")
// votes.insertToVotes()