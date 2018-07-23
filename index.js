const Table = require('cli-table')
const modelPolitician = require('./model/model_politician')
const modelVoter = require('./model/model_voters')
const [table, command, ...args] = process.argv.slice(2)

switch(table) {
  case 'politician': {
    switch(command) {
      case 'insert': {
        modelPolitician.insert([...args], (msg) => {
          console.log(msg)
        })
        break
      }
      case 'update': {
        modelPolitician.update([...args], (msg) => {
          console.log(msg)
        })
        break
      }
      case 'delete': {
        modelPolitician.remove([...args], (msg) => {
          console.log(msg)
        })
        break
      }
      case 'listParty': {
        const table = new Table()
        modelPolitician.listParty([...args], (data) => {
          table.push(['Name', 'Party', 'Grade Current'])
          for (let i = 0; i < data.length; i++) {
            var list = []
            list.push(
              data[i].name,
              data[i].party,
              data[i].grade_current
            )
            table.push(list)
          }
          console.log(table.toString())
        })
        break
      }
      case 'topVote': {
        const table = new Table()
        modelPolitician.topVote([...args], (data) => {
          table.push(['Total Vote', 'Name', 'Party', 'Location'])
          for (let i = 0; i < data.length; i++) {
            var list = []
            list.push(
              data[i].totalVote,
              data[i].name,
              data[i].party,
              data[i].location
            )
            table.push(list)
          }
          console.log(table.toString())
        })
        break
      }
      case 'hitungVote': {
        const table = new Table()
        modelPolitician.hitungVote([...args], (data) => {
          table.push(['Name', 'Total Vote'])
          for (let i = 0; i < data.length; i++) {
            var list = []
            list.push(
              data[i].name,
              data[i].totalVote
            )
            table.push(list)
          }
          console.log(table.toString())
        })
      }

      case 'listVoters': {
        const table = new Table()
        modelPolitician.listVoters([...args], (data) => {
          console.log(`Voter yang memilih "${data[0].name}"`)
          table.push(["First Name", "Last Name", "Gender", "Age"])
          for (let i = 0; i < data.length; i++) {
            var list = []
            list.push(
              data[i].first_name,
              data[i].last_name, 
              data[i].gender,
              data[i].age
            )
            table.push(list)
          }
          console.log(table.toString())
        })
      }
    }
    break
  }
  case 'voter': {
    switch(command) {
      case 'insert': {
        modelVoter.insert([...args], (msg) => {
          console.log(msg)
        })
        break
      }
      case 'delete': {
        modelVoter.remove([...args], (msg) => {
          console.log(msg)
        })
        break
      }
    }
  }
  default: {
    console.log(`
                                       Menu Help
      ============================================================================
      1. node index.js politician insert [name] [party] [location] [grade_current]
      2. node index.js politician update [id:value_id] [name_column:value_column]
      3. node index.js politician delete [id:value_id]
      4. node index.js politician listParty [value]
      5. node index.js politician topVote [topVote:value]
      6. node index.js politician hitungVote [hitungVote:value]
      7. node index.js politician listVoters [listVoter:value]
      4. node index.js voter insert [first_name] [last_name] [gender] [age]
      5. node index.js voter update [id:value_id] [name_column:value_column]
      6. node index.js voter delete [id:value_id]
      ============================================================================
      Name column :
      1. Politician:
         - name
         - party
         - location
         - grade_current
      2. Voter: 
         - first_name
         - last_name
         - gender
         - age
      ============================================================================
    `)
  }
}