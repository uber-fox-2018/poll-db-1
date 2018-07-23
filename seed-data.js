const fs = require('fs');
const db = require('./setup')

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

    /*  Tampilkan nama politician, partai dan grade_current politician
        tersebut yang berada di partai R dan memiliki grade_current
        range 9 s/d 11 */

    static display_release3_1(){
        db.all("SELECT * FROM politicians where grade_current BETWEEN 9 AND 11 AND party = 'R' ORDER BY grade_current", function (err, tables){
            if (err) throw err
            console.log(tables);
        })
    }

    /*  Hitung jumlah vote untuk politician yang bernama Olympia Snowe */

    static display_release3_2(){
        db.all("SELECT COUNT(*) as TotalVote, politicians.name FROM  votes LEFT JOIN  politicians ON  politicians.id = votes.politicianId WHERE name = 'Olympia Snowe'", function (err, tables){
            if (err) throw err
            console.log(tables);
        })
    }

    /*  Hitung jumlah vote untuk politician yang nama-nya mengandung kata Adam */

    static display_release3_3(){
        db.all("SELECT name, COUNT (name) as TotalVote FROM  votes LEFT JOIN  politicians ON  politicians.id = votes.politicianId WHERE politicians.name LIKE '%Adam%' GROUP BY name ORDER BY TotalVote ASC", function (err, tables){
            if (err) throw err
            console.log(tables);
        })
    }

    /*  Tampilkan 3 Politician beserta nama partai dan lokasi Politician tersebut,
        yang memiliki suara terbanyak. */

    static display_release3_4(){
        db.all("SELECT COUNT (name) as TotalVote, name, party, location FROM  votes LEFT JOIN  politicians ON  politicians.id = votes.politicianId GROUP BY name ORDER BY TotalVote DESC LIMIT 3", function (err, tables){
            if (err) throw err
            console.log(tables);
        })
    }

    /*  Tampilkan siapa saja yang melakukan voting ke politician yang bernama Olympia Snowe */

    static display_release3_5(){
        db.all("SELECT first_name, last_name, gender, age FROM voters LEFT JOIN votes ON voters.id = votes.voterId WHERE politicianId = ( select id from politicians where politicians.name = 'Olympia Snowe')", function (err, tables){
            if (err) throw err
            console.log(tables);
        })
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
// Politic.insert_all_data(result_table_votes)

Politic.display_release3_1()
Politic.display_release3_2()
Politic.display_release3_3()
Politic.display_release3_4()
Politic.display_release3_5()