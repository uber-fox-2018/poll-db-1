const sqlite3 = require('sqlite3').verbose();
const DbHelper = require('./db_helper');
const seed = require('./seed-data');
const setup = require('./setup');

class DbContext {
    constructor(connection) {
        this.connection = connection;
        this._politicians = new PoliticianDbSet(this.connection)
        this._voters = new VoterDbSet(this.connection);
    }

    initialize() {
        let db = new sqlite3.Database(this.connection);
        db.serialize(() => {
            setup(db);
            seed(db);
        })
        db.close();
    }

    query(sql, callback) {
        let db = new sqlite3.Database(this.connection);
        db.all(sql, callback);
        db.close();
    }

    get politicians() {
        return this._politicians;
    }

    get voters() {
        return this._voters;
    }
}

class DbSet {
    constructor(connection, tableName) {
        this.connection = connection;
        this.table_name = tableName;
    }

    list(callback) {
        let db = new sqlite3.Database(this.connection);
        let sql = `SELECT * FROM ${this.table_name}`;
        db.all(sql, callback);
        db.close();
    }

    count(callback) {
        let db = new sqlite3.Database(this.connection);
        db.get(`SELECT COUNT(*) as "count" FROM ${this.table_name}`, callback);
        db.close();
    }

    findById(id, callback) {
        let db = new sqlite3.Database(this.connection);
        let sql = `SELECT * FROM ${this.table_name} WHERE id = ${id}`;
        db.get(sql, callback);
        db.close();
    }

    add(obj, callback) {
        let db = new sqlite3.Database(this.connection);
        let sql = `INSERT INTO ${this.table_name} (${Object.keys(obj).join(',')}) `;
        sql += `VALUES (${DbHelper.convertValuesToDbFormat(Object.values(obj)).join(',')});`;
        db.run(sql, callback);
        db.close();
    }

    update(obj, callback) {
        let db = new sqlite3.Database(this.connection);
        let sql = `UPDATE ${this.table_name} `;
        sql += ` SET ${this._updateSetQueryBuilder(obj)}`;
        sql += ` WHERE id = ${obj.id};`;
        db.run(sql, callback);
        db.close();
    }

    delete(id, callback) {
        let db = new sqlite3.Database(this.connection);
        let sql = `DELETE FROM ${this.table_name} WHERE id = ${id}`;
        db.run(sql);
        db.run(sql, callback);
        db.close();
    }

    _updateSetQueryBuilder(obj) {
        let result = [];
        let objKeys = Object.keys(obj);
        for (let key of objKeys) {
            if (key === 'id')
                continue;
            else {
                result.push(`${key} = ${DbHelper.convertValueToDbFormat(obj[key])}`);
            }
        }
        return result;
    }
}

class PoliticianDbSet extends DbSet {
    constructor(connection) {
        super(connection, 'politicians');
    }
}

class VoterDbSet extends DbSet {
    constructor(connection) {
        super(connection, 'voters');
    }
}

module.exports = DbContext