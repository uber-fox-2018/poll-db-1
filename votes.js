const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pooldb');

class Votes {
  constructor() {
    
  }

  create(voter_id, politician_id) {
    let create = `INSERT INTO votes (voter_id, politician_id) 
                  VALUES ("${voter_id}", "${politician_id}")`;

    db.run(create, err => {
      err ? console.log('There is an error!') : console.log('Data successfully created.');
    });

  }

  update(vote_id, voter_id, politician_id) {
    let update = (`UPDATE votes 
                    SET voter_id = "${voter_id}", politician_id = "${politician_id}"
                    WHERE vote_id = ${vote_id}`);

    db.run(update, err => {
      err ? console.log('There is an error!') : console.log('Data successfully updated.');
    });

  }

  delete(vote_id) {
    let erase = `DELETE FROM votes WHERE vote_id = ${vote_id}`;
    db.run(erase, err => {
      err ? console.log('There is an error!') : console.log('Data successfully deleted.');
    });
  }

  countVote(politician_name) {
    let countVote = `SELECT count(*) AS vote_amount, politicians.name
                      FROM politicians
                      JOIN votes
                      ON votes.politician_id = politicians.politician_id
                      WHERE politicians.name = '${politician_name}';`
    
    db.all(countVote, (err, data) => {
      err ? console.log('Something error!') : console.table(data);
    });
  }

  searchPoliticiens(politician_name) {
    let search = `SELECT politicians.name as name, COUNT(votes.voter_id) as vote_amount
                  FROM politicians 
                  JOIN votes 
                    ON votes.politician_id = politicians.politician_id
                  WHERE politicians.name LIKE '${politician_name}%'
                  GROUP BY politicians.name`;

    db.all(search, (err, data) => {
      err ? console.log(err.message) : console.table(data);
    });

  }

  bigThree() {
    let bigThree = `SELECT COUNT(votes.voter_id) AS total_vote, politicians.name, politicians.party, politicians.location
                    FROM votes 
                    JOIN politicians 
                      ON votes.politician_id = politicians.politician_id
                    GROUP BY politicians.name
                    ORDER BY total_vote DESC
                    LIMIT 3`;

    db.all(bigThree, (err, data) => {
      err ? console.log(err.message) : console.table(data);
    });

  }

  findVoters(politician_name) {
    let finder = `SELECT first_name, last_name, gender, age 
                  FROM voters 
                  JOIN votes
                    ON voters.voter_id = votes.voter_id
                  WHERE votes.politician_id = (SELECT politician_id FROM politicians WHERE name = '${politician_name}')`;
          
    db.all(finder, (err, data) => {
      err ? console.log(err.message) : console.table(data);
    });

  }
  
}

let votes = new Votes()

// votes.create(99, 11);
// votes.update(79, 11);
// votes.delete(167);

// votes.countVote('Olympia Snowe');
// votes.searchPoliticiens('Adam');
// votes.bigThree();
votes.findVoters('Olympia Snowe');