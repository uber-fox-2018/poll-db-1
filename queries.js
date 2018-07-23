const db = require('./setup');
//RELEASE 3
function display(party, gradeCurrent){ 
    let min = gradeCurrent[0];
    let max = gradeCurrent[1];
    let sql = `SELECT name,
                      party,
                      grade_current
               FROM Politicians
               WHERE party = "${party}" AND grade_current BETWEEN ${min} AND ${max}
               ORDER BY grade_current`;
   
    db.all(sql,(err, row) => {
        if (err) {
          throw err;
        }
       console.table(row);
      });
}


function totalVote(name){
    let sql =  `SELECT COUNT(name) as totalValue,  name
                FROM Politicians as p
                LEFT JOIN Votes as v
                ON p.politicianID = v.politicianID
                WHERE p.name = "${name}"`;
    db.all(sql,(err, row) => {
        if (err) {
            throw err;
        }
            console.table(row);
    });
}

function voteForAllName(name){
   let sql = `SELECT name, count(name) as totalValue
              FROM Politicians
              JOIN Votes
              ON Politicians.politicianID = Votes.politicianID
              WHERE Politicians.name LIKE "%${name}%"
              GROUP BY name`
    db.all(sql,(err, row) => {
        if (err) {
            throw err;
        }
            console.table(row);
    });
}

function threeTopPolitician(){
    let sql = `SELECT COUNT(name) as totalVote, name, party, location
               FROM Politicians
               JOIN Votes
               ON Politicians.politicianID = Votes.politicianID
               GROUP BY 2 
               ORDER BY totalVote DESC
               limit 3`;
    db.all(sql,(err, row) => {
        if (err) {
            throw err;
        }
        console.table(row);
    });
}

function voters(politicianName){
    let sql = `SELECT first_name, last_name, gender, age
               FROM Voters
               JOIN Votes
               ON Voters.voterID= Votes.voterID
               WHERE Votes.politicianID = (SELECT politicianID FROM Politicians where name = "${politicianName}")`;
    db.all(sql,(err, row) => {
        if (err) {
            throw err;
        }
        console.table(row);
     });
}

display('R', [9,11]);
totalVote("Olympia Snowe");
voteForAllName("Adam");
threeTopPolitician();
voters("Olympia Snowe");
