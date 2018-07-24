const Controller = require('./controller/controller');
const PoliticianController = require('./controller/politician_controller');
const VoterController = require('./controller/voter_controller');

let controller = new Controller();
let politicianController = new PoliticianController();
let voterController = new VoterController();

let args = process.argv.slice(2);
let tableOption = args[0];
switch (tableOption) {
    case 'politicians': {
        let command = args[1];
        let options = args.slice(1);
        switch (command) {
            case 'add':
                console.log('politicians add')// politicianController.add(options[0], options[1], options[2], options[3]);
                break;
            case 'update':
                console.log('politicians update')
                // politicianController.update(options[0], options[1], options[2], options[3], options[4]);
                break;
            case 'delete':
                // politicianController.delete(options[0]);
                console.log('politicians delete')
                break;
            default:
                politicianController.help();
                break;
        }
        break;
    }

    case 'voters': {
        let command = args[1];
        let options = args.slice(1);
        switch (command) {
            case 'add':
                console.log('voters add');
                // voterController.add(options[0], options[1], options[2], options[3]);
                break;
            case 'update':
                console.log('voters update');
                // voterController.update(options[0], options[1], options[2], options[3], options[4]);
                break;
            case 'delete':
                console.log('voters delete');
                // voterController.delete(options[0]);
                break;
            default:
                voterController.help();
                break;
        }
        break;
    }

    case 'query': {
        let command = args[1];
        switch(command) {
            case '1': 
                controller.politicians_with_party_R_grade_9_to_11();
                break;
            case '2': 
                controller.total_vote_for_olympia_snowe();
                break;
            case '3': 
                controller.total_vote_for_names_contains_adam();
                break;
            case '4': 
                controller.total_vote_for_names_contains_adam();
                break;
            case '5': 
                controller.voters_who_vote_for_olympia_snowe();
                break;
            default:
                controller.help();
                break;
        }
    }

    default:
        politicianController.help();
        voterController.help();
        controller.help();
        break;
}