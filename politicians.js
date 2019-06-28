const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pooldb');

class Politician {
  constructor() {
    
  }

  create(name, party, location, grade_current) {
    let create = `INSERT INTO politicians (name, party, location, grade_current) VALUES ("${name}", "${party}", "${location}", "${grade_current}")`;

    db.run(create, err => {
      err ? console.log('There is an error!') : console.log('Data successfully created.')
    });
    
  };

  update(politician_id, name, party, location, grade_current) {
    let update = `UPDATE politicians 
    SET name = "${name}", party = "${party}", location = "${location}", grade_current = ${grade_current}
    WHERE politician_id = ${politician_id}`;

    db.run(update, err => {
      err ? console.log('There is an error!') : console.log('Data successfully updated.')
    });
  }

  delete(politician_id) {
    let erase = `DELETE FROM politicians WHERE politician_id = ${politician_id}`;
    db.run(erase, err => {
      err ? console.log('There is an error!') : console.log('Data successfully deleted.')
    });

  }
  
  search(party) {
    let search = `SELECT name, party, grade_current FROM politicians WHERE  party = '${party}' AND grade_current BETWEEN 9 AND 11`;
    db.all(search, (err,data) => {
      err ? console.log('Something error!') : console.table(data);
    });
    
  }
  
}

let politician = new Politician();


// politician.create('Muhammad Al-Fatih', 'AM', 'PL', 17);
// politician.update(22, 'Muhammad Reynand Al-Fatih', 'AM', 'PL', 17);
// politician.delete(21);

politician.search('R');