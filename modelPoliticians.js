const sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./pollDB1')


class Politicians{
    constructor(){

    }

    insertPoliticians(name, party, location, grade_current) {
        db.run(`INSERT INTO politicians 
                VALUES 
                (null, "${name}","${party}","${location}",${grade_current})`,function(err){
                    if(err){
                        throw console.error(err.message)
                    }
                    console.log('tambah data berhasil');
                    
                })
    }

    updatePoliticians(id, name, party, location, grade_current){
        db.run(`UPDATE politicians
                SET name = "${name}", party = "${party}", location = "${location}", grade_current = ${grade_current}
                WHERE id = ${id}`,function(err){
                    if(err){
                        throw console.error(err.message)
                    }
                    console.log('update berhasil');
                    
                })
    }


    deletePoliticians(id){
        db.run(`DELETE FROM politicians
                WHERE id = ${id}`,(err) =>{
                    if(err){
                        throw console.error(err.message)
                    }else{
                        console.log('berhasil,');
                        
                    }
                }
            )
    }

    showPartyR(){
        var query = `SELECT name, party, grade_current FROM politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11 ` 

        db.all(query, (err,data) => {
            if(err){
                throw message.error(err.message)
            }else{
                // console.table(data);
                console.table(data);
                
                
            }
        })
    }



}


var politicians = new Politicians()
// politicians.insertPoliticians('ari','pdi','banten',31.2)
// politicians.updatePoliticians(21,'amelia','demokrat','tangerang',10.67)
// politicians.deletePoliticians(22)
politicians.showPartyR()


// SELECT COUNT(votes.voterId) as totalVotes, voters.first_name, gender, age FROM votes JOIN voters ON votes.voterId = voters.id GROUP BY voters.first_name HAVING totalVotes > 1 ORDER BY totalVotes DESC
// SELECT name, location, grade_current, COUNT(votes.id) as totalVote 
// FROM politicians 
// JOIN VOTES 
//   ON politicians.id = votes.politiciansId
// GROUP BY name
// HAVING grade_current < 9
// ORDER BY totalVote 

