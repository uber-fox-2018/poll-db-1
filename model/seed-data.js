const CsvHelper = require('./csv_helper');
const DbHelper = require('./db_helper');

const seed = db => {
    let csvHelper = new CsvHelper();
    let politicians = csvHelper.parse('./csv/politicians.csv');
    let voters = csvHelper.parse('./csv/voters.csv');
    let votes = csvHelper.parse('./csv/votes.csv');

    politiciansInsertQuery = insertQueryBuilder('politicians', politicians);
    votersInsertQuery = insertQueryBuilder('voters', voters);
    votesInsertQuery = insertQueryBuilder('votes', votes);

    db.run(politiciansInsertQuery);
    db.run(votersInsertQuery);
    db.run(votesInsertQuery);
}

const insertQueryBuilder = (tableName, data) => {
    let columnNamesStr, columnDataStrs = [], insertQuery = '';
    columnNamesStr = `(${Object.keys(data[0]).join(',')})`;

    for (let i = 0; i < data.length; i++) {
        let dbValues = DbHelper.convertValuesToDbFormat(Object.values(data[i]));
        columnDataStrs.push(`(${dbValues.join(',')})`);
    }

    insertQuery += `INSERT INTO ${tableName} ${columnNamesStr} VALUES `;
    insertQuery += columnDataStrs.join(',');
    return insertQuery;
}

module.exports = seed