const Controller = require('./controller')

//RELEASE 2 : CRUD Politicians ----------------------
//Create Politicians
Controller.createPoliticians('Wahyudi Setiaji', 'WS', 'INA', 11.5362423)

//Update Politicians with ID
Controller.updatePoliticians(21, "Wahyudi Cudang", "WC", "ID", 17.5362423)

//Delete Politicians with ID
Controller.deletePoliticians(21) 


//RELEASE 2 : CRUD Voters ----------------------
//Create Voters
Controller.createVoters('Ricky', 'Hidayat', 'male', 27)

//Update Voters with ID
Controller.updateVoters(151, 'Dungbray', 'Hidayat', 'male', 27)

//Delete Voters with ID
Controller.deleteVoters(151)


//RELEASE 2 : CRUD Votes ----------------------
//Create Votes
Controller.createVotes(1, 1)

//Update Votes with ID
Controller.updateVotes(164, 1, 2)

//Delete Votes with ID
Controller.deleteVotes(164)


//RELEASE 3 : FIND Politicians by party : "R" And grade_current range 9 s/d 11
Controller.findPoliticiansBy("R", 9, 11)

//RELEASE 3 : FIND total vote from Politicians WHERE name "Olypia Snowe"
Controller.findTotalVoteByName("Olympia Snowe")

//RELEASE 3 : FIND total vote WHERE name "Adam"
Controller.findVotersAdam("Adam")

//RELEASE 3 : FIND Top 3 Politicians
Controller.findTop3()

//RELEASE 3 : FIND total voting to Politicians "Olympia Snowe"
Controller.findVotingByOlympia("Olympia Snowe")

