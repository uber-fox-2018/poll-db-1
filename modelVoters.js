const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./pollDB1',(err) => {
    if(err){
        throw console.error(err.message)
    }
})

class Voters{
    constructor(){

    }

    insertVoters(first_name, last_name, gender, age) {
        var query = `INSERT INTO voters VALUES (null, "${first_name}","${last_name}","${gender}",${age});`

        db.run(query,(err)=>{
            if(err) throw console.error(err.message)
            console.log('data berhasil ditambahkan');
            
        })
    }


    updateVoters(id, first_name, last_name, gender, age){
        var query = `UPDATE voters
                SET first_name = "${first_name}", last_name = "${last_name}", gender = "${gender}", age = ${age}
                WHERE id = ${id}`
        
        db.run(query,(err) => {
            if(err) throw console.error(err.message)
            console.log('data berhasil diubah');
            
        })  
    }


    delete(id){
        var query = `DELETE FROM voters WHERE id = ${id}`
        db.run(query,(err) => {
                if(err){ throw console.error(err.message)}
                console.log('data berhasil dihapus');

        })
    }
}

console.log(db);

var voters = new Voters()
// voters.insertVoters('imam','farid','male',23)
// voters.updateVoters(151,'imam','ali','female',23)
// voters.delete(152)
