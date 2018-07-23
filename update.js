const db = require('./setup');

function update(tableName, setValues, whereCondition){
    let columName;
    let newValue;
    let id;
    let query;
    if(tableName === "Politicians"){
        for(let column in setValues){
            columName = column;
            newValue = setValues[column];
            id = Number(whereCondition.id);
            
            if(columName!="grade_current"){
                query = `UPDATE Politicians
                         SET ${columName}   = "${newValue}"
                         WHERE politicianID = ${id}`;
            }else{
                query = `UPDATE Politicians
                         SET ${columName}    = ${newValue}
                         WHERE politicianID = ${id}`;
            }
            db.run(query, function (err) {
                if (err) throw err;
                console.log('Successfully updated!');
            });
        }
    }else if(tableName === "Voters"){
        for(let column in setValues){
            columName = column;
            newValue = setValues[column];
            id = Number(whereCondition.id)
            if(columName!="age"){
                query = `Update Voters
                         SET ${columName} = "${newValue}"
                         WHERE voterID = ${id}`;
            }else{
                query = `Update Voters
                         SET ${columName} = ${newValue}
                         WHERE voterID = ${id}`;
            }
            db.run(query, function (err) {
                if (err) throw err;
                console.log('Successfully updated!');
            });
        }
    }else{
        for(let column in setValues){
            columName = column;
            newValue = setValues[column];
            id = Number(whereCondition.id)
            query = `Update Votes
                     SET ${columName} = ${newValue}
                     WHERE id = ${id}`;
            db.run(query, function (err) {
                if (err) throw err;
                console.log('Successfully updated!');
            });
        }
    }

}
update("Politicians", {name:"susan", party:"SN", location:"ID", grade_current:88.888888888}, {id:21})
update("Voters", {first_name: 'susan', last_name: 'nio', age: 19}, {id: 325});
update("Votes", {politicianID: 41, voterID: 325}, {id: 327});
 