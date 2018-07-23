const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pooldb');

let fs = require ('fs');
let voters = fs.readFileSync('voters.csv', 'utf8')
let votersData = voters.split('\r\n')

function voter () {
  let voterD = [];
  for (let i = 0; i < votersData.length; i++) {
    voterD.push(votersData[i].split(','))
  }
  // console.log(voterD)

  for(let j = 1; j < voterD.length; j++) {
    let insert = `INSERT INTO voters(first_name, last_name, gender, age)
    VALUES ("${voterD[j][0]}", "${voterD[j][1]}", "${voterD[j][2]}", ${voterD[j][3]})`
    // console.log(voterD[j][2])
    db.run(insert);
  }
}
voter();



let votes = fs.readFileSync('votes.csv', 'utf8')
let votesData = votes.split('\r\n')

function vote () {
  let voteDa = [];
  for (let i = 0; i < votesData.length; i++) {
    voteDa.push(votesData[i].split(','))
  }
  // console.log(voteDa)

  // voterId,politicianId,
  // 1,17

  for(let j = 1; j < voteDa.length; j++) {
    let insertVote = `INSERT INTO votes(voters_id, politician_id)
    VALUES (${voteDa[j][0]}, ${voteDa[j][1]})`
    // console.log(voterD[j][2])
    db.run(insertVote);
  }
}

// console.log(votersData);
// console.log(voter(votersData));
vote();


let politicians = fs.readFileSync('politicians.csv', 'utf8')
let politiciansData = politicians.split('\r\n')

function politician () {
  let politicianDa = [];
  for (let i = 0; i < politiciansData.length; i++) {
    politicianDa.push(politiciansData[i].split(','))
  }

  politicianDa.pop()
  console.log(politicianDa)

  // voterId,politicianId,
  // 1,17

// name,party,location,grade_current

  for(let j = 1; j < politicianDa.length; j++) {
    let insertPoliti = `INSERT INTO politician(name, party, location, grade_current)
    VALUES ("${politicianDa[j][0]}", "${politicianDa[j][1]}", "${politicianDa[j][2]}", ${politicianDa[j][3]})`
    // console.log(politicianDa[j][2])
    db.run(insertPoliti);
  }
}

// politician()
