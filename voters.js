const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pooldb');

class Voters {
  constructor() {

  }

  create(first_name, last_name, gender, age) {
    let create = `INSERT INTO voters (first_name, last_name, gender, age) 
    VALUES ("${first_name}", "${last_name}", "${gender}", ${age})`;

    db.run(create, err => {
      err ? console.log('There is an error!') : console.log('Data successfully created.');
    });

  }

  update(voter_id, first_name, last_name, gender, age) {
    let update = `UPDATE voters 
    SET first_name = "${first_name}", last_name = "${last_name}", gender = "${gender}", age = ${age}
    WHERE voter_id = ${voter_id}`;

    db.run(update, err => {
      err ? console.log('There is an error!') : console.log('Data successfully updated.');
    });

  }

  delete(voter_id) {
    let erase = `DELETE FROM voters WHERE voter_id = ${voter_id}`;

    db.run(erase, err => {
      err ? console.log('There is an error!') : console.log('Data successfully deleted.');
    });
  }
  

}

let voters = new Voters();

// voters.create('Imam', 'Agussopian', 'male', 29);
voters.update('Imam', 'Aguss', 'male', 29);
// voters.delete(151);
