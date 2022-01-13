const {readFile} = require('fs').promises;
const db = require("../db/connect").promise();

const validPoiTypes = ['cafe', 'food', 'point_of_interest', 'establishment', 'restaurant', 'convenience_store', 'grocery_or_supermarket',
'store', 'bakery', 'supermarket', 'car_repair', 'park', 'tourist_attraction', 'gym', 'health', 'car_wash', 'liquor_store', 'shopping_mall',
'furniture_store', 'home_goods_store', 'lodging', 'laundry', 'hardware_store', 'electronics_store', 'hair_care', 'drugstore', 'bank', 'atm',
'finance', 'doctor', 'casino', 'car_dealer', 'pet_store', 'bar', 'town_square', 'accounting', 'pharmacy', 'other'];

const insertStatus = {
    type: "INSERT",
    rowsAttemped: 0,
    success: false,
    fileLastModified: "",
    filename: ""
}

exports.insertPois = async (req, res, next) => {
    if (!req.body.last_modified) {
        throw "NoField:fileLastModified";
    }
    insertStatus.fileLastModified = req.body.last_modified;
    insertStatus.filename = req.file.originalname;
    const poiStr = await readFile(req.file.path, 'utf8');
    const poiArr = JSON.parse(poiStr);
    const poiSqlQuery = "INSERT INTO poi_table (id, name, address, latitude, longitude, rating, rating_n, poi_type) VALUES";
    const ptSqlQuery = "INSERT INTO popular_times_table (poi_id, day, hour, number_of_people) VALUES";

    let poiBufStr = poiSqlQuery;
    let ptBufStr = ptSqlQuery;
    let i = 0;

    await db.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    await db.beginTransaction();
    try {
        for (let poi of poiArr) {
            if(i !== 0 && i % 8400 === 0) {
                // commit
                await commitInsert(poiBufStr, db);
                await commitInsert(ptBufStr, db);
                // reset buffer strings
                poiBufStr = poiSqlQuery;
                ptBufStr = ptSqlQuery;
                i = 0;
            }
            poiBufStr += formatForInsertPoi(poi);
            ptBufStr += formatForInsertPopularTimes(poi);
            i+=168;
        }
        // If buffer stream is not empty commit one last time
        if(i !== 0) {
            await commitInsert(poiBufStr, db);
            poiBufStr = poiSqlQuery;
            await commitInsert(ptBufStr, db);
            poiBufStr = ptSqlQuery;
        }

        // TODO: This is a DEV if-else delete for prod
        // if (poi_types === 0) {
        //     throw "Nope"
        // }
        // else {
        //     let temp_str_types = '';
        //     for (let type of poi_types) {
        //         temp_str_types += ` '${type}',`;
        //     }
        //     console.log(temp_str_types);
        // }
        await db.commit();
        insertStatus.success = true;
        res.status(200).json({
            sqlSuccess: true
        });
    }
    catch(err) {
        let msg = "Last insert failed! Database rollback successful!";
        if (err.message = "invalidPoiType") {
            msg += ` Error: ${err.message}`;
        }
        if (err.message == "NoField:fileLastModified") {
            msg += ` Error: ${err.message}`;
        }
        db.rollback();
        res.status(500).json({
            error: true,
            dbRollback: true,
            message: msg
        })
    }
    req.locals.dbStatus = insertStatus;
    next();
}


async function commitInsert(sqlStatement, db) {
    sqlStatement = sqlStatement.slice(0, -1) + ';';
    try {
        await db.execute(sqlStatement);
    }
    catch(err) {
        throw err;
    }
}

function formatForInsertPoi(poi) {
    insertStatus.rowsAttemped += 1;
    // TODO: This is a DEV call delete for prod
    // registerPoiTypeIfNotExists(poi.types);
    let safe_name = poi.name.replace(/"/g, "'");
    let safe_rating = poi.rating ? poi.rating : 0;
    let safe_rating_n = poi.rating_n ? poi.rating_n : 0;
    let typeSetStr = "('";
    for (type of poi.types) {
        if (!validPoiTypes.includes(type) && !hasOther) {
            throw 'invalidPoiType';
        }
        typeSetStr += `${type},`;
    }
    typeSetStr = typeSetStr.slice(0, -1);
    typeSetStr += "')";
    return(` ("${poi.id}", "${safe_name}", "${poi.address}", ${poi.coordinates.lat}, ${poi.coordinates.lng}, ${safe_rating}, ${safe_rating_n}, ${typeSetStr}),`);
}

function formatForInsertPopularTimes(poi) {
    let outStr = '';
    const popTimesArr = poi.populartimes;
    for (let popTime of popTimesArr) {
        let day = dayToIntMapper(popTime.name);
        for (let i=0; i < 24; i++) {
            insertStatus.rowsAttemped += 1;
            outStr += ` ("${poi.id}", ${day}, ${i}, ${popTime.data[i]}),`
        }
    }
    return outStr;
}

function dayToIntMapper(day) {
    switch(day) {
        case "Sunday":
            return 0;
        case "Monday":
            return 1;
        case "Tuesday":
            return 2;
        case "Wednesday":
            return 3;
        case "Thursday":
            return 4;
        case "Friday":
            return 5;
        case "Saturday":
            return 6;
    }
}


// Get to see what types a POI may be of
// TODO: This is a DEV function delete for prod
// var poi_types = [];
// function registerPoiTypeIfNotExists(types) {
//     for (let type of types) {
//         if (!poi_types.includes(type)) {
//             poi_types.push(type);
//         }
//     }
// }