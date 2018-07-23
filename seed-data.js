const fs = require('fs');
const db =require('./setup')

class Politic {
    static parser_politicians (){
        let result_data_politicians = []
        const data_politicians = fs.readFileSync('politicians.csv', 'utf8').split('\n')
        
        for (let i = 1 ; i < data_politicians.length-1 ; i++){
            result_data_politicians.push( [data_politicians[i].split(',')[0], data_politicians[i].split(',')[1], data_politicians[i].split(',')[2],Number(data_politicians[i].split(',')[3])])
        }
        return result_data_politicians
    }
    
    static insert_table_politicians (arr){
        let query =[]
        
        for (let i = 0 ; i < arr.length ; i++){
            query.push(`INSERT INTO politicians(name, party, location, grade_current) VALUES ("${arr[i][0]}", "${arr[i][1]}", "${arr[i][2]}", "${arr[i][3]}")`)
        }
        return query
    }

    static parser_voters (){
        const data_voters = fs.readFileSync('voters.csv', 'utf8').split('\n')
        let result_data_voters = []
        for (let i = 1 ; i < data_voters.length-1 ; i++){
            result_data_voters.push( [data_voters[i].split(',')[0], data_voters[i].split(',')[1], data_voters[i].split(',')[2],Number(data_voters[i].split(',')[3])])
        }
        
        return result_data_voters
    }

    static insert_table_voters (arr){
        let query =[]
        
        for (let i = 0 ; i < arr.length ; i++){
            query.push(`INSERT INTO voters(first_name, last_name, gender, age) VALUES ("${arr[i][0]}", "${arr[i][1]}", "${arr[i][2]}","${arr[i][3]}")`)
        }
        return query
    }

    static parser_votes(){
        const data_votes = fs.readFileSync('votes.csv', 'utf8').split('\n')
        let result_data_votes = []

        for (let i = 1 ; i < data_votes.length-1 ; i++){
            result_data_votes.push([data_votes[i].split(',')[0], data_votes[i].split(',')[1]])
        }
        return result_data_votes
    }

    static insert_table_votes (arr){
        let query =[]
        
        for (let i = 0 ; i < arr.length ; i++){
            query.push(`INSERT INTO votes(voterId, politicianId) VALUES ("${arr[i][0]}", "${arr[i][1]}")`)
        }
        return query
    }

    static insert_all_data (arr){
        
        for (let i = 0 ; i < arr.length ; i++){
            console.log(arr[i]);
            
            db.run(arr[i], function (err){
                if (err) throw err
            });
        }
    }
}

let resultPoliticians = Politic.parser_politicians()
let resultVoters = Politic.parser_voters()
let resultVotes = Politic.parser_votes()

let result_table_politicians = Politic.insert_table_politicians(resultPoliticians)
let result_table_voters = Politic.insert_table_voters(resultVoters)
let result_table_votes = Politic.insert_table_votes(resultVotes)

// Politic.insert_all_data(result_table_politicians)
// Politic.insert_all_data(result_table_voters)
Politic.insert_all_data(result_table_votes)