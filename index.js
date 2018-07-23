const command = process.argv[2];
const input = process.argv.slice(3);
const CUD = require('./CUD');
const display = require('./display');

switch (command){
  case 'help' :
  display.help();
  break;
  case 'add' :
  CUD.add(input[0], input.slice(1), (text)=> {
    display.message(text)
  });
  break;
  default :
  display.help();
}