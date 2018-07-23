var sqlite = require('sqlite3').verbose()
var file = 'pollDB.db'
var db = new sqlite.Database(file)
var fs = require('fs')


//Release 3.1
db.all('SELECT * FROM politicians WHERE grade_current > 9 AND grade_current < 11', function (err, politicians) {
  console.log(politicians);
}); 


//Release 3.2
db.all(`SELECT politicians.name, COUNT(politician_id) AS "totalVote" FROM votes JOIN politicians ON politicians.id = votes.politician_id WHERE politician_id = 17 `, [], (err,data) => {
    console.log(data);
  });


//Release 3.3
let query = "SELECT name,count(*) AS totalVote  FROM votes LEFT JOIN politicians ON   politicians.id = votes.politician_id WHERE politicians.name LIKE '%Adam%' GROUP BY name"

db.all(query,function(err,rows) {
  if(err) {
    throw err
  }

  console.log(rows)
})


//Release 3.4
let query = "SELECT COUNT(*) AS totalVote,name,party,location FROM votes JOIN politicians ON politicians.id = votes.politician_id GROUP BY name ORDER BY totalVote DESC LIMIT 3"

db.all(query,function(err,rows) {
  if(err) {
    throw err
  }

  console.log(rows)
})


//Release 3.5
let query = 
	"SELECT first_name,last_name,gender,age FROM votes LEFT JOIN voters ON votes.voter_id = voters.id LEFT JOIN politicians ON votes.politician_id = politicians.id WHERE politicians.name = 'Olympia Snowe' GROUP BY voters.first_name"

db.all(query,function(err,rows) {
  if(err) {
    throw err
  }
  console.log(rows)
})