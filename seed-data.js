let sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./database.db");
const fs = require("fs");

class Politician {
  constructor(name, party, location, grade_current) {
    this.name = name;
    this.party = party;
    this.location = location;
    this.grade_current = grade_current;
  }
}
class Voter {
  constructor(first_name, last_name, gender, age) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.gender = gender;
    this.age = age;
  }
}

class Vote {
  constructor(voterId, politicianId) {
    this.voterId = voterId;
    this.politicianId = politicianId;
  }
}

class Seed {
  constructor() {}

  seedFilePoliticians(file) {
    let politicianData = fs
      .readFileSync(file)
      .toString()
      .split(`\n`);

    let arr = [];

    for (let i = 1; i < politicianData.length - 1; i++) {
      arr.push(politicianData[i].split(","));
    }
    for (let j = 0; j < arr.length; j++) {
      let name = arr[j][0];
      let party = arr[j][1];
      let location = arr[j][2];
      let grade_current = arr[j][3];
      let politician = new Politician(name, party, location, grade_current);

      db.run(
        `INSERT INTO Politicians (name,party,location,grade_current) 
      VALUES ("${politician.name}","${politician.party}","${
          politician.location
        }","${politician.grade_current}")`,
        err => {
          if (err) throw err;
          console.log(`Seed Politicans ${politician.name}' Data Successs`);
        }
      );
    }
  }

  seedFileVoters(file) {
    let voterData = fs
      .readFileSync(file)
      .toString()
      .split(`\n`);
    let arr = [];

    for (let i = 1; i < voterData.length - 1; i++) {
      arr.push(voterData[i].split(","));
    }

    for (let j = 0; j < arr.length; j++) {
      let first_name = arr[j][0];
      let last_name = arr[j][1];
      let gender = arr[j][2];
      let age = arr[j][3];
      let voter = new Voter(first_name, last_name, gender, age);

      db.run(
        `INSERT INTO Voters (first_name,last_name,gender,age) 
        VALUES ("${voter.first_name}","${voter.last_name}","${voter.gender}","${
          voter.age
        }")`,
        err => {
          if (err) throw err;
          console.log(`Seed Voters ${voter.first_name}' Data Successs`);
        }
      );
    }
  }

  seedFileVotes(file) {
    let voteData = fs
      .readFileSync(file)
      .toString()
      .split(`\n`);
    let arr = [];

    for (let i = 1; i < voteData.length - 1; i++) {
      arr.push(voteData[i].split(","));
    }
    for (let j = 0; j < arr.length; j++) {
      let voterId = arr[j][0];
      let politicianId = arr[j][1];

      let vote = new Vote(voterId, politicianId);

      db.run(
        `INSERT INTO Votes (voterId,politicianId) 
          VALUES ("${vote.voterId}","${vote.politicianId}")`,
        err => {
          if (err) throw err;
          console.log(
            `Seed Votes ${vote.voterId}' and ${vote.politicianId} Data Successs`
          );
        }
      );
    }
  }

  createData(table, id, col1, col2, col3, col4) {
    console.log(`insert new data to ${table}`);

    let lastId = db.each(`SELECT * FROM ${table} ORDER BY id DESC LIMIT 1`);
    let insertId=lastId+id
    console.log(lastId);

    db.each(
      `INSERT INTO ${table} VALUES("${insertId}","${col1}", "${col2}", "${col3}", "${col4}");`,
      err => {
        if (err) throw err;
      }
    );
  }

  updateFile(id, table, column, edit) {
    console.log(
      `Updated Table ${table} and set column ${column} to ${edit} by id ${id}`
    );
    db.each(
      `UPDATE ${table} SET ${column} ="${edit}" WHERE id="${id}"`,
      err => {
        if (err) {
          throw err;
        } else {
          console
            .log
            ();
        }
      }
    );
  }

  deleteFile(table, id) {
    console.log(`succesfully deleted id ${id} from table ${table}`);
    db.each(
      `DELETE FROM ${table}
    WHERE id="${id}";`,
      err => {
        if (err) throw err;
      }
    );
  }
}

const seed = new Seed(`./politicians.csv`);

// console.log(seed.seedFilePoliticians(`./politicians.csv`));
// console.log(seed.seedFileVoters(`./voters.csv`));
console.log(seed.seedFileVotes(`./votes.csv`));
// seed.updateFile(1, `Voters`, `gender`, `female`);
// seed.createData(`Voters`, 1, `ade`, `fahri`, `male`, `23`);
// seed.deleteFile(`Voters`, 151);


/*
RELEASE 3

No 1 
`SELECT * FROM Politicians WHERE party = 'R' 
        AND grade_current  BETWEEN 9 AND 11`
No 2
`SELECT COUNT(name) AS totalVote, name 
        FROM politicians 
        INNER JOIN votes ON Votes.politicianId = politicians.id 
        WHERE politicians.name LIKE "Olympia Snowe"`

No 3
` SELECT  name, COUNT(name) as TotalVote FROM Politicians
         JOIN  Votes
         ON Politicians.id = Votes.politicianId
         WHERE Politicians.name LIKE '%adam%'
         GROUP BY name`

No 4 
`SELECT  COUNT(*) AS totalVote, name, party, location FROM Politicians
        JOIN  Votes
        ON Politicians.id = Votes.politicianId
        GROUP BY name
        ORDER BY totalVote DESC
        LIMIT 3`

No 5 
`SELECT first_name, last_name, gender, age FROM Votes
        INNER JOIN  Politicians
        ON Votes.politicianId = Politicians.id
        JOIN Voters
        ON Voters.id = Votes.id
        WHERE name = 'Olympia Snowe';`

*/