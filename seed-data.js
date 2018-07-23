const fs = require('fs')
const db = require('./setup')

let voterCsv = fs.readFileSync('./voters.csv', 'utf8').split('\n')
let voteCsv = fs.readFileSync('./votes.csv', 'utf8').split('\n')
let politicCsv = fs.readFileSync('./politicians.csv', 'utf8').split('\n')

class Politic {
    static read(file) {
        for (let a = 1; a < file.length; a++) {
            if (file[a] != '') {
                // console.log('ini nama', file[a].split(',')[0])
                // console.log('ini parry', file[a].split(',')[1])
                // console.log('ini location', file[a].split(',')[2])
                // console.log('ini grand', file[a].split(',')[3])
                let query = `
                insert into politicians(name, party, location, grade_current)
                values ("${file[a].split(',')[0]}", "${file[a].split(',')[1]}", "${file[a].split(',')[2]}", "${file[a].split(',')[3]}")
                `
                db.run(query)
            }
        }

    }
}

class Vote {
    static read(file) {
        for (let a = 1; a < file.length; a++) {
            if (file[a] != '') {
                let query = `
                insert into votes(voter_id, politician_id)
                values ("${file[a].split(',')[0]}", "${file[a].split(',')[1]}")`
                db.run(query)
            }
        }
    }
}

class Voter {
    static read(file) {
        for (let a = 1; a < file.length; a++) {
            if (file[a] != '') {
                let query = `
                insert into voters(first_name, last_name, gender, age)
                values ("${file[a].split(',')[0]}", "${file[a].split(',')[1]}", "${file[a].split(',')[2]}", "${file[a].split(',')[3]}")
                `
                db.run(query)
            }
        }

    }
}

Politic.read(politicCsv)
Vote.read(voteCsv)
Voter.read(voterCsv)