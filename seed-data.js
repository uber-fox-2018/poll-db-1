const fs = require('fs')
const db = require('./setup')

class ParserData {
    static parseToArr(data){
        let splitData = data.split('\n')
        let result = []

        for(let i = 1; i < splitData.length-1; i++){
            result.push(splitData[i].split(','))
        }

        // for(let j = 0; j < result.length; j++){
        //     result[j][result[j].length-1] = Number(result[j][result[j].length-1])
        // }

        return result
    }

    static insertDataPoliticians(insert){
        let insert_data = insert

        let result = []
        for(let i = 0; i < insert_data.length; i++){
            let query
            query = `INSERT INTO politicians (name, party, location, grade_current) VALUES ('${insert_data[i][0]}', '${insert_data[i][1]}', '${insert_data[i][2]}', '${insert_data[i][3]}')`
            result.push(query)
        }

        return result
    }

    static insertDataVoters(insert){
        let insert_data = insert

        let result = []
        for(let i = 0; i < insert_data.length; i++){
            let query
            query = `INSERT INTO voters (first_name, last_name, gender, age) VALUES ('${insert_data[i][0]}', '${insert_data[i][1]}', '${insert_data[i][2]}', '${insert_data[i][3]}')`
            result.push(query)
        }

        return result
    }

    static insertDataVotes(insert){
        let insert_data = insert

        let result = []
        for(let i = 0; i < insert_data.length; i++){
            let query
            query = `INSERT INTO votes (voter_id, politician_id) VALUES ('${insert_data[i][0]}', '${insert_data[i][1]}')`
            result.push(query)
        }

        return result
    }


    static runInsert(dataInsert){

        // console.log(dataInsert.length)
        for(let i = 0; i < dataInsert.length; i++){
            db.serialize(() => {
                db.run(dataInsert[i], function (err) {
                    if (err) throw err;
                });
            })
        }
    }
}


let dataPoliticians = fs.readFileSync('./politicians.csv', 'utf-8')
let dataVoters = fs.readFileSync('./voters.csv', 'utf-8')
let dataVotes = fs.readFileSync('./votes.csv', 'utf-8')

let data_politicians = ParserData.parseToArr(dataPoliticians);
let data_voters = ParserData.parseToArr(dataVoters);
let data_votes = ParserData.parseToArr(dataVotes);

//== insert data votes
// let dataInsertVotes = ParserData.insertDataVotes(data_votes)
// ParserData.runInsert(dataInsertVotes)

//== insert data voters
// let dataInsertVoters = ParserData.insertDataVoters(data_voters)
// ParserData.runInsert(dataInsertVoters)

//== insert data politiians
// let dataInsertPoliticians = ParserData.insertDataPoliticians(data_politicians)
// ParserData.runInsert(dataInsertPoliticians)



