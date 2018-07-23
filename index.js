let command = process.argv[2]
let data = process.argv.slice(3)
let Control = require('./controller.js')

console.log(data)
if (command == 'insertPoliticians'){
    Control.insertPoliticians()
}
else if (command == 'insertToVoters'){
    Control.insertToVoters()
}

else if (command == 'insertToVotes'){
    Control.insertToVotes()
}

else if (command == 'addVoters'){
    Control.addVoters(data)
}

else if (command == 'addPoliticians'){
    Control.addPoliticians(data)
}

else if (command == 'addVotes'){
    Control.addVotes(data)
}

else if (command == 'updateVotes'){
    Control.updateVotes(data)
}

else if (command == 'updateVoters'){
    Control.updateVoters(data)
}

else if (command == 'updatePoliticians'){
    Control.updatePoliticians(data)
}

else if (command == 'deletePoliticians'){
    Control.deletePoliticians(data)
}

else if (command == 'deleteVoters'){
    Control.deleteVoters(data)
}

else if (command == 'deleteVotes'){
    Control.deleteVotes(data)
}

else if (command == 'showPoliticians'){
    Control.showPoliticians(data)
}
else if (command == 'countVotes'){
    Control.countVotes(data)
}
else if (command == 'countVotesLike'){
    Control.countVotesLike()
}
else if (command == 'countVotesTotal'){
    Control.countVotesTotal()
}
else if (command == 'countVotesPerson'){
    Control.countVotesPerson()
}




