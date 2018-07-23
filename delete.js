const db = require('./setup');

function deleted(tableName, whereCondition){
    let targetName;
    let targetValue;
    let query;
    if(tableName==="Politicians"){
        targetValue = whereCondition.politicianID;
        targetName = 'politicianID';
    }else if(tableName==="Voters"){
        targetValue = whereCondition.voterID;
        targetName = 'voterID';           
    }else{
        targetValue = whereCondition.id;
        targetName = 'id'; 
    }
    query = `DELETE FROM ${tableName} WHERE ${targetName}=${targetValue}`;
    db.run(query, function (err) {
        if (err) throw err;
        console.log('Successfully deleted!');
    }); 
}

deleted("Politicians", {politicianID: 21});
