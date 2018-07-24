class Politician {
    constructor(name, party, location, grade_current) {
        this.id;
        this.name = name;
        this.party = party;
        this.location = location;
        this.grade_current = grade_current;
    }
}

class PoliticianFactory {
    constructor() { }
    static create(name, party, location, grade_current) {
        return new Politician(name, party, location, grade_current);
    }
    static assign(obj) {
        return new Politician(obj.name, obj.party, obj.location, Number(obj.grade_current));
    }
    static batchAssign(objects) {
        let politicians = [];
        for(let obj of objects) {
            politicians.push(this.assign(obj));
        }
        return politicians;
    }
    
}

module.exports = PoliticianFactory;