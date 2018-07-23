const db = require('./setup')

class Model {

    // menampilkan data politicians pada party R dengan grade >= 8 dan grade <= 11
    static showDatapolitician(){
        let query = `SELECT name, party, grade_current 
                     FROM politicians 
                     WHERE party = 'R' AND grade_current >= 9 AND grade_current <= 11`;
        db.all(query, function(err, data){
            console.log(data)
        })
    }

    // jumlah vote untuk politician yang bernama Olympia Snowe
    static totalVoteOlympia(){
        let query = `SELECT COUNT(*) AS totalVote,name FROM votes join politicians
                     ON votes.politician_id = politicians.id
                     WHERE politicians.name = 'Olympia Snowe'`
        db.all(query, function(err, data){
            console.log(data)
        })
    }

    // jumlah vote untuk politician yang nama-nya mengandung kataAdam
    static totalVoteAdam(){
        let query = `SELECT name, COUNT(*) AS totalVote FROM votes join politicians
                     ON votes.politician_id = politicians.id
                     WHERE politicians.name LIKE  '%Adam%' GROUP BY politicians.name`
        db.all(query, function(arr, data) {
            console.log(data)
        })
    }

    // 3 Politician beserta nama partai dan lokasi Politician tersebut, yang memiliki suara terbanyak
    static theBigThreeVotes(){
        let query = `SELECT COUNT(*) AS totalVote, name, party, location 
                     FROM votes JOIN politicians
                     ON votes.politician_id = politicians.id
                     GROUP BY politicians.name 
                     ORDER BY totalVote DESC
                     LIMIT 3`
        db.all(query, function(arr, data) {
            console.log(data)
        })
    }

    // 
    static votingToOlympia(){
        // cara satu
        // let query = `SELECT first_name, last_name, gender, age 
        //              FROM voters JOIN votes 
        //              ON voters.id = votes.voter_id 
        //              JOIN politicians ON politicians.id = votes.politician_id
        //              WHERE politicians.name = 'Olympia Snowe'`

        let query = `SELECT first_name, last_name, gender, age 
                     FROM voters JOIN votes 
                     ON voters.id = votes.voter_id 
                     WHERE votes.politician_id = (SELECT id FROM politicians 
                     WHERE politicians.name = 'Olympia Snowe')`
        db.all(query, function(arr, data) {
            console.log(data)
        })
    }

}

Model.showDatapolitician()
Model.totalVoteOlympia()
Model.totalVoteAdam()
Model.theBigThreeVotes()
Model.votingToOlympia()