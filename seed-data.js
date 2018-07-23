const fs = require('fs')
const db = require('./setup')

let voterCsv = fs.readFileSync('./voters.csv', 'utf8').split('\n')
let voteCsv = fs.readFileSync('./votes.csv', 'utf8').split('\n')
let politicCsv = fs.readFileSync('./politicians.csv', 'utf8').split('\n')

class Politic {
    static create(file) {
        for (let a = 1; a < file.length; a++) {
            if (file[a] != '') {
                let query = `
                insert into politicians(name, party, location, grade_current)
                values ("${file[a].split(',')[0]}", "${file[a].split(',')[1]}", "${file[a].split(',')[2]}", "${file[a].split(',')[3]}")`
                db.run(query, (err) => {
                    if (err) throw err
                })
            }
        }
    }
}

class Vote {
    static create(file) {
        for (let a = 1; a < file.length; a++) {
            if (file[a] != '') {
                let query = `
                insert into votes(voter_id, politician_id)
                values ("${file[a].split(',')[0]}", "${file[a].split(',')[1]}")`
                db.run(query, (err) => {
                    if (err) throw err
                })
            }
        }
    }
}

class Voter {
    static create(file) {
        for (let a = 1; a < file.length; a++) {
            if (file[a] != '') {
                let query = `
                insert into voters(first_name, last_name, gender, age)
                values ("${file[a].split(',')[0]}", "${file[a].split(',')[1]}", "${file[a].split(',')[2]}", "${file[a].split(',')[3]}")
                `
                db.run(query, (err) => {
                    if (err) throw err
                })
            }
        }

    }
}

class Display {

    static release_3_1() {
        db.all("SELECT * FROM politicians where grade_current BETWEEN 9 AND 11 AND party = 'R' ORDER BY grade_current", (err, tables) => {
            if (err) throw err
            console.log(tables);
        })
    }

    static release_3_2() {
        db.all("SELECT COUNT(*) as TotalVote, politicians.name FROM  votes LEFT JOIN  politicians ON  politicians.id = votes.politician_id WHERE name = 'Olympia Snowe'", (err, tables) => {
            if (err) throw err
            console.log(tables);
        })
    }

    static release_3_3(){
        db.all("SELECT name, COUNT (name) as TotalVote FROM  votes LEFT JOIN  politicians ON  politicians.id = votes.politician_id WHERE politicians.name LIKE '%Adam%' GROUP BY name ORDER BY TotalVote ASC", (err, tables) => {
            if (err) throw err
            console.log(tables);
        })
    }

    static release_3_4(){
        db.all("SELECT COUNT (name) as TotalVote, name, party, location FROM  votes LEFT JOIN  politicians ON  politicians.id = votes.politician_id GROUP BY name ORDER BY TotalVote DESC LIMIT 3", (err, tables) => {
            if (err) throw err
            console.log(tables);
        })
    }

    static release_3_5(){
        db.all("SELECT first_name, last_name, gender, age FROM voters LEFT JOIN votes ON voters.id = votes.voterId WHERE politician_id = ( select id from politicians where politicians.name = 'Olympia Snowe')", (err, tables) => {
            if (err) throw err
            console.log(tables);
        })
    }
}

// Politic.create(politicCsv)
// Vote.create(voteCsv)
// Voter.create(voterCsv)'
Display.release_3_1()
Display.release_3_2()
Display.release_3_3()
Display.release_3_4()
Display.release_3_5()
