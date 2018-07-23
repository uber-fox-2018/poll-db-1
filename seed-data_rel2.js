var sqlite = require('sqlite3').verbose()
var file = 'pollDB.db'
var db = new sqlite.Database(file)
var fs = require('fs')

// POLITICIANS //

function updateDataPoliticians (id, name, party, location, grade_current) {
    const query = `UPDATE politicians
    SET name         = name,
        party        = party,
        location     = location,
        grade_current= grade_current

    WHERE id= id`;

    db.run(query, function (err) {
    if (err) throw err;
    console.log('Successfully updated!');
    });
}

function deleteDataPoliticians (id) {
    const query = `DELETE FROM politicians WHERE id=id`;

    db.run(query, function (err) {
      if (err) throw err;
      console.log('Successfully deleted!');
    });

}

// VOTERS //

function updateDataVoters (id, first_name, last_name, gender, age) {
    const query = `UPDATE voters
    SET first_name   = first_name ,
        last_name    = last_name,
        gender       = gender,
        age          = age

    WHERE id= id`;

    db.run(query, function (err) {
    if (err) throw err;
    console.log('Successfully updated!');
    });
}

function deleteDataVoters (id) {
    const query = `DELETE FROM voters WHERE id=id`;

    db.run(query, function (err) {
      if (err) throw err;
      console.log('Successfully deleted!');
    });

}