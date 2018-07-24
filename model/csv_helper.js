const fs = require('fs');

class CsvHelper {
    constructor() {
        this.lineSeparator = '\r\n';
        this.delimeter = ',';
        this.encoding = 'utf8';
    }

    parse(fileName) {
        let fileContent, contentArray, attributeNames, objects = [];
        fileContent = fs.readFileSync(fileName, this.encoding);
        contentArray = fileContent.split(this.lineSeparator);
        attributeNames = contentArray[0].split(this.delimeter);
        for (let i = 1; i < contentArray.length; i++) {
            let obj = this._parseRowToObject(attributeNames, contentArray[i].split(this.delimeter));
            objects.push(obj);
        }
        return objects;
    }

    _parseRowToObject(attributeNames, attributeValues) {
        let obj = {};
        for(let i = 0; i < attributeValues.length; i++) {
            obj[attributeNames[i]] = attributeValues[i];
        }
        return obj;
    }
}

module.exports = CsvHelper;