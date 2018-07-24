class DbHelper {

    static convertValuesToDbFormat(values) {
        let dbValues = [];
        for (let value of values) {
            dbValues.push(this.convertValueToDbFormat(value));
        }
        return dbValues;
    }

    static convertValueToDbFormat(value) {
        switch (typeof value) {
            case ('string'):
                return `"${value}"`;
            case ('number'):
                return value;
            default:
                return "null";
        };
    }
}

module.exports = DbHelper;