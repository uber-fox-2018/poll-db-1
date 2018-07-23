const fs = require('fs')
const db = require('./database.js')

class ImplementFile {
    static readData(file) {
        return fs.readFileSync(file, 'utf8')
    }

    static writeData() {
        return fs.writeFileSync(file, 'utf8')
    }
}

class DatabaseUpdate {
    static writeData(data) {
        db.run(data, (err) => {
            (err) ? console.log(err) : console.log('data has been updated to database!');
        })
        db.close()
    }

    static readData(query) {
        db.all(query, (err, data) => {
            (!err) ? console.table(data) : console.log(err);
        })
    }
}

class Politicians {
    static parsingData(data) {
        let splitData = data.split('\n')
        let resultArr = []
        for(let i = 0; i < splitData.length; i++) {
            resultArr.push(splitData[i].split(','))
        }
        return resultArr
    }

    static insertData(data) {
        let dataPoliticians = this.parsingData(data)
        let queryInsert = `INSERT INTO Politicians(name, party, location, grade_current) VALUES `
        for(let i = 1; i < dataPoliticians.length; i++) {
            queryInsert += `('${dataPoliticians[i][0]}', '${dataPoliticians[i][1]}', '${dataPoliticians[i][2]}' , ${dataPoliticians[i][3]}), `
        }
        let modQuery = queryInsert.slice(0, queryInsert.length - 2)
        modQuery += ';'
        DatabaseUpdate.writeData(modQuery)
    }

    static updateData(id, column, newValue) {
        let queryUpdate = `UPDATE Politicians SET ${column} = "${newValue}" WHERE id = ${id};`
        DatabaseUpdate.writeData(queryUpdate)
    }

    static deleteData(id) {
        let queryDelete = `DELETE FROM Politicians WHERE id = ${id}`
        DatabaseUpdate.writeData(queryDelete)
    }

    static readDataGrade() {
        let readQuery = `SELECT name, party, grade_current FROM Politicians WHERE grade_current BETWEEN 9 AND 11`
        DatabaseUpdate.readData(readQuery)
    }

    static readDataOlymp() {
        let readQuery = `SELECT Count(politicianId) AS totalVote, name FROM Votes
                        INNER JOIN Politicians
                            ON politicianId = Politicians.id
                        WHERE politicianId = 17`
        DatabaseUpdate.readData(readQuery)
    }

    static readDataAdam() {
        let readQuery = `SELECT name, (
                        SELECT COUNT(*) 
                            FROM Votes 
                            WHERE politicianId = Politicians.id
                        ) AS totalVote 
                        FROM Politicians
                            WHERE Politicians.name LIKE "adam%"`
        DatabaseUpdate.readData(readQuery)
    }

    static readData3Politicians() {
        let readQuery = `SELECT (
            SELECT COUNT(*) 
            FROM votes 
            WHERE politicianId = politicians.id
        ) AS totalVote, 
        name, party, location 
        FROM politicians 
        ORDER BY totalVote DESC 
        LIMIT 3`
        DatabaseUpdate.readData(readQuery)
    }

    static whoIsVotingOlymp() {
        let readQuery = `SELECT firstName, lastName, gender, age FROM Voters 
                            INNER JOIN Votes
                            ON Voters.id = Votes.VoterId
                        WHERE Votes.politicianId = 17`
        DatabaseUpdate.readData(readQuery)
    }
}

class Voters {
    static parsingData(data) {
        let splitData = data.split('\n')
        let resultArr = []
        for(let i = 0; i < splitData.length; i++) {
            resultArr.push(splitData[i].split(','))
        }
        return resultArr
    }

    static insertData(data) {
        let dataPoliticians = this.parsingData(data)
        let queryInsert = `INSERT INTO Voters(firstName, lastName, gender, age) VALUES `
        for(let i = 1; i < dataPoliticians.length; i++) {
            queryInsert += `("${dataPoliticians[i][0]}", "${dataPoliticians[i][1]}", "${dataPoliticians[i][2]}" , ${Number(dataPoliticians[i][3])}), `
        }
        let modQuery = queryInsert.slice(0, queryInsert.length - 2)
        modQuery += ';'
        DatabaseUpdate.writeData(modQuery)
    }

    static updateData(id, column, newValue) {
        let queryUpdate = `UPDATE Voters SET ${column} = "${newValue}" WHERE id = ${id};`
        DatabaseUpdate.writeData(queryUpdate)
    }

    static deleteData(id) {
        let queryDelete = `DELETE FROM Voters WHERE id = ${id}`
        DatabaseUpdate.writeData(queryDelete)
    }
}

class Votes {
    static parsingData(data) {
        let splitData = data.split('\n')
        let resultArr = []
        for(let i = 0; i < splitData.length; i++) {
            resultArr.push(splitData[i].split(','))
        }
        return resultArr
    }

    static insertData(data) {
        let dataPoliticians = this.parsingData(data)
        let queryInsert = `INSERT INTO Votes(voterId, politicianId) VALUES `
        for(let i = 1; i < dataPoliticians.length; i++) {
            queryInsert += `(${dataPoliticians[i][0]}, ${dataPoliticians[i][1]}), `
        }
        let modQuery = queryInsert.slice(0, queryInsert.length - 2)
        modQuery += ';'
        DatabaseUpdate.writeData(modQuery)
    }    

    static updateData(id, column, newValue) {
        let queryUpdate = `UPDATE Votes SET ${column} = ${newValue} WHERE id = ${id};`
        DatabaseUpdate.writeData(queryUpdate)
    }

    static deleteData(id) {
        let queryDelete = `DELETE FROM Votes WHERE id = ${id}`
        DatabaseUpdate.writeData(queryDelete)
    }
}

//=====================POLITICIANS=============================//
let filePoliticians = ImplementFile.readData('politicians.csv')
// Politicians.insertData(filePoliticians)
// Politicians.updateData(2, 'name', 'Mahmud')
// Politicians.deleteData(20)
// Politicians.readDataGrade()
// Politicians.readDataOlymp()
// Politicians.readDataAdam()
// Politicians.readData3Politicians()
Politicians.whoIsVotingOlymp()
//========================VOTERS===============================//
let fileVoters = ImplementFile.readData('voters.csv')
// Voters.insertData(fileVoters)
// Voters.updateData(2, 'firstName', 'Jono')
// Voters.deleteData(49)
//==========================VOTES=============================//
let fileVotes = ImplementFile.readData('votes.csv')
// Votes.insertData(fileVotes)
// Votes.updateData(3, 'politicianId', 3)
// Votes.deleteData(3)
// console.log();