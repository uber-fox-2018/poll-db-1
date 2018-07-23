const sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./pollDB1')

class Votes{
    insertData(voterId, politiciansId){
        var query = `INSERT INTO votes 
                     VALUES (null, ${voterId},${politiciansId});`
        
        db.run(query,(err)=> {
            if(err) console.error(err.message)
            else{

                console.log('data berhasil ditambahkan');
            }
            
        })
    }

    updateData(id,voterId,politiciansId){
        var query = `UPDATE votes
                     SET voterId = ${voterId}, politiciansId = ${politiciansId}
                     WHERE id = ${id}`
        db.run(query,(err)=> {
            if(err) console.error(err.message)
            console.log('data berhasil diubah');
        })
    }

    deleteData(id){
        var query =`DELETE FROM votes
                    WHERE id = ${id}`
        db.run(query,(err)=> {
            if(err) console.error(err.message)
            console.log('data berhasil dihapus');
        })
        
    }

    OlympiaVotes(){
        var query = `SELECT COUNT(votes.voterId) as total_votes, politicians.name as name
                    FROM politicians 
                    JOIN votes 
                        ON politicians.id = votes.politiciansId
                    WHERE politicians.name = 'Olympia Snowe'`
        
        db.all(query,(err,data)=> {
            if(err){
                console.error(err.message)
            } else{
                
            }
            console.table(data);
        })
    }

    likeAdamVoters(){
        var query = `SELECT politicians.name as name, COUNT(votes.voterId) as Total_vote
                    FROM politicians 
                    JOIN votes 
                        ON politicians.id = votes.politiciansId
                    WHERE politicians.name LIKE '%Adam%'
                    GROUP BY politicians.name`
         db.all(query,(err,data)=> {
            if(err){
                console.error(err.message)
            } else{
                
            }
            console.table(data);
        })
    }

    big3Politicians(){
        var query= `SELECT COUNT(votes.voterId) as Total_Vote, politicians.name, politicians.party, politicians.location
                    FROM politicians 
                    JOIN votes 
                        ON politicians.id = votes.politiciansId
                    GROUP BY politicians.name
                    ORDER BY Total_Vote DESC
                    LIMIT 3
                    `

        db.all(query,(err,data)=> {
            if(err){
                console.error(err.message)
            } else{
                
            }
            console.table(data);
        })
    }


    OlympiaVoters(){
        var query = `SELECT first_name, last_name, gender, age 
                     FROM voters 
                     JOIN votes
                        ON voters.id = votes.voterId
                     WHERE votes.politiciansId = (SELECT id FROM politicians WHERE name = 'Olympia Snowe')`

        db.all(query,(err,data)=> {
            if(err){
                console.error(err.message)
            } else{
                
            }
            console.table(data);
        })
        
    }


}


let votes = new Votes()
// votes.insertData(152,21)
// votes.updateData(164,20,151)
// votes.deleteData(164)
// votes.deleteData(165)
// votes.deleteData(166)

// votes.OlympiaVotes()
// votes.likeAdamVoters()
// votes.big3Politicians()
// votes.OlympiaVoters()
