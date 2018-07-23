const Politicians = require('./model/politicians');
const Voters = require('./model/voters');
const Votes = require('./model/votes')
const View = require('./view')

class Controller {

    //CRUD Politicians
    static createPoliticians (name, party, location, grade_current){
        Politicians.create(name, party, location, grade_current, (result) => {
            View.show(result)
        })
    }

    static updatePoliticians (id, name, party, location, grade_current){
        Politicians.update(id, name, party, location, grade_current, (result) => {
            View.show(result)
        })
    }

    static deletePoliticians (id) {
        Politicians.delete(id, (result) => {
            View.show(result)
        })
    }

    static findPoliticiansBy (party, num1, num2) {
        Politicians.find(party, num1, num2, (result) => {
            View.show(result)
        })
    }

    //CRUD Voters
    static createVoters (first_name, last_name, gender, age,){
        Voters.create(first_name, last_name, gender, age, (result) => {
            View.show(result)
        })
    }

    static updateVoters (id, first_name, last_name, gender, age,){
        Voters.update(id, first_name, last_name, gender, age, (result) => {
            View.show(result)
        })
    }

    static deleteVoters (id) {
        Voters.delete(id, (result) => {
            View.show(result)
        })
    }

     //CRUD Votes
     static createVotes (votersId, politiciansId){
        Votes.create(votersId, politiciansId, (result) => {
            View.show(result)
        })
    }

    static updateVotes (id, votersId, politiciansId){
        Votes.update(id, votersId, politiciansId, (result) => {
            View.show(result)
        })
    }

    static deleteVotes (id) {
        Votes.delete(id, (result) => {
            View.show(result)
        })
    }

    //RELEASE 3 Find By Party "R"
    static findPoliticiansBy (party, num1, num2) {
        Politicians.find(party, num1, num2, (result) => {
            View.show(result)
        })
    }

     //RELEASE 3 Find total vote 
     static findTotalVoteByName(name) {
         Politicians.findTotal(name, (result) => {
             View.show(result)
         })
     }

     //RELEASE 3 Find total vote WHERE name "Adam"
     static findVotersAdam(name) {
         Politicians.findVotersAdam(name, (result) => {
             View.show(result)
         })
     }

     ////RELEASE 3 FIND Top 3 Politicians
     static findTop3() {
         Politicians.findTop((result) => {
            View.show(result)
         })
     }

     //RELEASE 3 FIND total voting to Politicians 
     static findVotingByOlympia(name) {
         Politicians.findVoting(name, (result) => {
            View.show(result)
         })
     }

}

module.exports = Controller;