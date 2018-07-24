const createTablePoliticianSql = () => {
    return `CREATE TABLE IF NOT EXISTS politicians(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT,
        party TEXT,
        location TEXT,
        grade_current REAL
    );`
}

const createTableVotersSql = () => {
    return `CREATE TABLE IF NOT EXISTS voters(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        gender TEXT,
        age INTEGER
    );`
}

const createTableVotesSql = () => {
    return `CREATE TABLE IF NOT EXISTS votes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        voterId INTEGER,
        politicianId INTEGER,
        FOREIGN KEY(voterId) REFERENCES voters(id),
        FOREIGN KEY(politicianId) REFERENCES politicians(id)
    );`
}

const dropTableSql = table_name => {
    return `DROP TABLE IF EXISTS ${table_name}`;
}

const setup = db => {
    db.run(dropTableSql('politicians'));
    db.run(createTablePoliticianSql());
    db.run(dropTableSql('voters'));
    db.run(createTableVotersSql());
    db.run(dropTableSql('votes'));
    db.run(createTableVotesSql());
}

module.exports = setup;