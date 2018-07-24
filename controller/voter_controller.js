const DbContext = require('../model/db_context');

class VoterController {
    constructor() {
        let context = new DbContext('./poll-db.db');
        this.model = context.voters;
    }

    list() {
        this.model.list((err, rows) => {
            if(err)
                console.log('Error.', err);
            else {
                console.log(rows);
            }
        });
    }

    find(id) {
        this.model.findById(id, (err, row) => {
            if(err)
                console.log(err);
            else
                console.log(row);
        });
    }

    add(first_name, last_name, gender, age) {
        let obj = {
            first_name: first_name,
            last_name: last_name,
            gender: gender,
            age: age
        };
        this.model.add(obj, err => {
            if(err)
                console.log('Add voter failed.', err);
            else {
                console.log('Add voter success.');
                this.model.count((err, row) => {
                    console.log(`Voters count: ${row.count}`);
                });
            }
        });
    }

    update(id, first_name, last_name, gender, age) {
        let obj = {
            id: id,
            first_name: first_name,
            last_name: last_name,
            gender: gender,
            age: age
        };
        this.model.update(obj, err => {
            if(err)
                console.log('Error.', err);
            else
                this.model.findById(id, (err, row) => {
                    console.log('Updated.');
                    console.log(row);
                });
        });
    }

    delete(id) {
        this.model.delete(id, (err) => {
            if(err)
                console.log('Delete voter failed.', err);
            else {
                console.log('Delete voter success.');
                this.model.count((err, row) => {
                    console.log(`Voters count: ${row.count}`);
                });
            }
        });
    }

    help() {
        console.log(`node index.js voter add <name> <party> <location> <grade>`);
        console.log(`node index.js voter update <id> <name> <party> <location> <grade>`);
        console.log(`node index.js voter delete <id>`);
    }
}

module.exports = VoterController;
