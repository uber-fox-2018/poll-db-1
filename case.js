const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

class Case {

  static a (){
    db.all(`select name, party, grade_current 
    FROM Politicians
    WHERE party = 'R' 
    AND grade_current BETWEEN
    9 AND 11`, (err, rows) => {
      if (err){
        console.log(err.message);
      } else {
        console.log(rows)
      }
    })
  }

  static b (){
    db.get(`SELECT COUNT (*) totalVote, P.name
    FROM Politicians P
    INNER JOIN PoliticianVoters PV ON P.id = PV.politician_id
    WHERE P.name = 'Olympia Snowe'`, (err, row) => {
      if (err){
        console.log(err.message);
      } else {
        console.log(row)
      }
    })
  }

  static c (){
    db.all(`SELECT P.name, COUNT (*) totalVote
    FROM Politicians P
    INNER JOIN PoliticianVoters PV ON P.id = PV.politician_id
    WHERE P.name LIKE '%Adam%'
    GROUP BY P.name`, (err, row) => {
      if (err){
        console.log(err.message);
      } else {
        console.log(row)
      }
    })
  }

  static d (){
    db.all( `SELECT COUNT (*) totalVote, P.name, P.party, P.location
    FROM Politicians P
    INNER JOIN PoliticianVoters PV ON P.id = PV.politician_id
    GROUP BY P.name
    ORDER BY totalVote DESC
    LIMIT 3`, (err, row) => {
      if (err){
        console.log(err.message);
      } else {
        console.log(row)
      }
    })
  }

  static e (){
    db.all(`SELECT first_name, last_name, gender, age
    FROM Voters V
    INNER JOIN PoliticianVoters PV ON V.id = PV.voter_id
    INNER JOIN Politicians P ON PV.politician_id = P.id
    WHERE P.name = 'Olympia Snowe'`, (err, row) => {
      if (err){
        console.log(err.message);
      } else {
        console.log(row)
      }
    })

    
  }
}

Case.a();
Case.b();
Case.c();
Case.d();
Case.e();