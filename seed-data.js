const fs = require("fs");
const db = require("./db.js");

class DataDealer{
	constructor(){

	}

	static loadDataFromCSVAsync(fileDir, loadDataHandler){
		fs.readFile(fileDir, "utf8",(err, data)=>{
			if(err) throw err;
			loadDataHandler(data);
		});
	}

	static loadDataFromCSV(fileCSVDir){
		let [columnName, ...data] = fs.readFileSync(fileCSVDir, "utf8").split("\n").map(x=>x.split(","));
		return [columnName, data];
	}

	static loadColumnsInfo(tableName, withId=false, loadColumnInfoHandler){
		db.all(`PRAGMA table_info(${tableName});`, (err, rows)=>{
			let columnNames = rows.map(x=>x.type);
			if(!withId){
				columnNames = columnNames.slice(1);
			}
			loadColumnInfoHandler(columnNames);
		});
	}

	static convert_decisions(columnDataType, dataArgs){
		for(let dataKey in dataArgs){
			if(columnDataType[dataKey].match(/CHAR/g) || columnDataType[dataKey] === "TEXT"){
				dataArgs[dataKey] = `"${dataArgs[dataKey]}"`;
			}
		}
		return dataArgs;
	}

	static insertIntoTableFromCSV(tableName, fileCSVDir, withId){
		let result = this.loadDataFromCSV(fileCSVDir);
		this.loadColumnsInfo(tableName, withId,(datatypes)=>{
			let convertedForQuery = result[1].map(x=>DataDealer.convert_decisions(datatypes, x));
			for (let data of convertedForQuery){
				let query = `INSERT INTO ${tableName}(${result[0]}) VALUES (${data})`;
				db.run(query,(err)=>{
					console.log(err, query);
				});
			}
		});
	}

	static insertIntoTable(tableName, withId, newRowArgs){
		this.loadColumnsInfo(tableName, withId,(datatypes)=>{
			let convertedForQuery = DataDealer.convert_decisions(datatypes, newRowArgs);
			let query = `INSERT INTO ${tableName}(${result[0]}) VALUES (${data})`;
			db.run(query,(err)=>{
				console.log(err, query);
			});
		});
	}

}

DataDealer.insertIntoTable("politicians", "./politicians.csv");
DataDealer.insertIntoTable("Voters", "./voters.csv");
DataDealer.insertIntoTable("Votes", "./votes.csv");



//let data = ["1", "asdfasdf", "eri", "asdfasd", "0999"];

//DataDealer.convert_decisions([ 'INTEGER', 'VARCHAR(30)', 'VARCHAR(1)', 'VARCHAR(2)', 'REAL' ],data);
//console.log(...data);