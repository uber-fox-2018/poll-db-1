let ModelVoters = require('./modelVoters.js')
let ModelVotes = require('./modelVotes.js')
let ModelPoliticians = require('./modelPoliticians.js')


class Control {
    static add(data) {
        Model.add(data)
    }

    static showPoliticians(data) {
        ModelPoliticians.show(data,(result) => {
            console.log(result)
        })
    }

    static countVotes(data) {
        ModelVotes.countVotes(data,(result) => {
            console.log(result)
        })
    }
    static countVotesLike() {
        ModelVotes.countVotesLike((result) => {
            console.log(result)
        })
    }
    static countVotesTotal() {
        ModelVotes.countVotesTotal((result) => {
            console.log(result)
        })
    }
    static countVotesPerson() {
        ModelVotes.countVotesPerson((result) => {
            console.log(result)
        })
    }
    



    //UPDATE
    static updateVotes(data) {
        ModelVotes.update(data)
    }

    static updateVoters(data) {
        ModelVoters.update(data)
    }

    static updatePoliticians(data) {
        ModelPoliticians.update(data)
    }
    //DELETE

    static deletePoliticians(data) {
        ModelPoliticians.delete(data)
    }

    static deleteVoters(data) {
        ModelVoters.delete(data)
    }
    static deleteVotes(data) {
        ModelVotes.delete(data)
    }
    //ADD

    static addVotes(data) {
        ModelVotes.add(data)
    }
    static addVoters(data) {
        ModelVoters.add(data)
    }

    static addPoliticians(data) {
        ModelPoliticians.add(data)
    }

    static insertPoliticians() {
        ModelPoliticians.insertPoliticians()
    }

    static insertToVotes() {
        ModelVotes.insertToVotes()
    }

    static insertToVoters() {
        ModelVoters.insertToVoters()
    }

}

module.exports = Control