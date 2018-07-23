const argv = process.argv;
const ModelPolitician = require('./models/politician.js');
const ModelVoter = require('./models/voter.js');
const ModelVote = require('./models/vote.js');

let table = argv[2];
let command = argv[3];

if (table == 'Politicians') {
    if(command == 'create') {
        let name = argv[4];
        let party = argv[5];
        let location = argv[6];
        let grade_current = argv[7];
        ModelPolitician.createDataPolitician(name, party, location, grade_current);

    } else if (command == 'update') {
        let id = argv[4];
        let column_edited = argv[5];
        let value_edited = argv[6];
        ModelPolitician.updatePoliticianData(id, column_edited, value_edited);

    } else if (command == 'delete') {
        let id = argv[4];
        ModelPolitician.deletePolitician(id);
    }

} else if (table == 'Voters') {
    if (command == 'create') {
        let first_name = argv[4];
        let last_name = argv[5];
        let gender = argv[6];
        let age = argv[7];
        ModelVoter.createDataVoter(first_name, last_name, gender, age);

    } else if (command == 'update') {
        let id = argv[4];
        let column_edited = argv[5];
        let value_edited = argv[6];
        ModelVoter.updateVoterData(id, column_edited, value_edited);

    } else if (command == 'delete') {
        let id = argv[4];
        ModelVoter.deleteVoter(id);
    }

} else if (table == 'Votes') {
    if (command == 'create') {
        let voterId = argv[4];
        let politicianId = argv[5];
        ModelVote.createDataVotes(voterId, politicianId);

    } else if (command == 'update') {
        let id = argv[4];
        let column_edited = argv[5];
        let value_edited = argv[6];
        ModelVote.updateVoteData(id, column_edited, value_edited);

    } else if (command == 'delete') {
        let id = argv[4];
        ModelVote.deleteVote(id);
    }
}

if (argv[2] == 'filter') {
    if (argv[3] == '1') {
        ModelPolitician.filterOne();
    } else if (argv[3] == '2') {
        ModelPolitician.filterTwo();
    } else if (argv[3] == '3') {
        ModelPolitician.filterThree();
    } else if (argv[3] == '4') {
        ModelPolitician.filterFour();
    } else if (argv[3] == '5') {
        ModelPolitician.filterFive();
    }
}