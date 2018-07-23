const Model = require('./Model.js');
const View = require('./View.js');

class Controller {
    constructor(input) {
        this.data = [];
        this.input = input;
        this.command();
    }

    command() {
        if(this.input[0] == 'politicians') {
            this.politicians()
        } else if(this.input[0] == 'addPolitician') {
            this.addingPolitician()
        } else if(this.input[0] == 'addVoter') {
            this.addingVoter()
        } else if(this.input[0] == 'addVote') {
            this.addingVote()
        }
    }

    // adding vote from argv
    addingVote() {
        let voter_id = this.input[1];
        let politician_id = this.input[2];
        Model.addVote(voter_id, politician_id);
    }

    // adding voter from argv
    addingVoter() {
        let first_name = this.input[1];
        let last_name = this.input[2];
        let gender = this.input[3];
        let age = this.input[4];
        Model.addVoter(first_name, last_name, gender, age);
    }

    // adding politician from argv to sql
    addingPolitician() {
        let name = this.input[1];
        let party = this.input[2];
        let location = this.input[3];
        let grade_current = this.input[4];
        Model.addPolitician(name, party, location, grade_current)
    }

    politicians() {
        // let dataPoliticians = Model.ReadPoliticians();
        // Model.WriteFromCSVPoliticians(dataPoliticians)

        // let dataVoters = Model.ReadVoters();
        // Model.WriteFromCSVVoters(dataVoters);

        // let dataVotes = Model.ReadVotes();
        // Model.WriteFromCSVVotes(dataVotes);
    }
}

module.exports = Controller