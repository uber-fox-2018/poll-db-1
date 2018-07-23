class Display {

  static help (){
    console.log(`node index.js help`);
    console.log(`node index.js add <table name> <data>`);
    console.log(`node index.js update <table name> <id> <new data>`);
    console.log(`node index.js delete <table name> <id>`);
  }

  static message (text){
    console.log(text)
  }
}

module.exports = Display;