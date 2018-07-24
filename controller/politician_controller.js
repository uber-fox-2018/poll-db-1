const DbContext = require('../model/db_context');

class PoliticianController {
    constructor() {
        let context = new DbContext('./poll-db.db');
        this.model = context.politicians;
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

    add(name, party, location, grade) {
        let obj = {
            name: name,
            party: party,
            location: location,
            grade_current: grade
        };
        this.model.add(obj, err => {
            if(err)
                console.log('Add politiciant failed.', err);
            else {
                console.log('Add politiciant success.');
                this.model.count((err, row) => {
                    console.log(`Politiciants count: ${row.count}`);
                });
            }
        });
    }

    update(id, name, party, location, grade) {
        let obj = {
            id: id,
            name: name,
            party: party,
            location: location,
            grade_current: grade
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
                console.log('Delete politiciant failed.', err);
            else {
                console.log('Delete politiciant success.');
                this.model.count((err, row) => {
                    console.log(`Politiciants count: ${row.count}`);
                });
            }
        });
    }

    help() {
        console.log(`node index.js politician add <name> <party> <location> <grade>`);
        console.log(`node index.js politician update <id> <name> <party> <location> <grade>`);
        console.log(`node index.js politician delete <id>`);
    }
}

module.exports = PoliticianController;
