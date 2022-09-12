const {readFile} = require('fs').promises;
const db = require("../db/connect").promise();
const utilsPois = require("../utils/utils_pois");

const insertStatus = {
    type: "INSERT",
    rowsAttemped: 0,
    success: false,
    fileLastModified: "",
    filename: ""
}

exports.insertPois = async (req, res, next) => {
    insertStatus.rowsAttemped = 0;
    insertStatus.fileLastModified = req.body.last_modified;
    insertStatus.filename = req.file.originalname;
    const poiStr = await readFile(req.file.path, 'utf8');
    const poiArr = JSON.parse(poiStr);
    const poiSqlQuery = "INSERT INTO poi_table (id, name, address, latitude, longitude, rating, rating_n) VALUES";
    const ptSqlQuery = "INSERT INTO popular_times_table (poi_id, day, hour, number_of_people) VALUES";
    const poitypeSqlQuery = "INSERT INTO poi_type (type, poi_id) VALUES"

    let poiBufStr = poiSqlQuery;
    let ptBufStr = ptSqlQuery;
    let poitypeBufStr = poitypeSqlQuery; 
    let i = 0;

    await db.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    await db.beginTransaction();
    try {
        if (!req.body.last_modified) {
            throw Error("NoField:fileLastModified");
        }
        for (let poi of poiArr) {
            if(i !== 0 && i % 8400 === 0) {
                // commit
                await commitInsert(poiBufStr, db);
                await commitInsert(ptBufStr, db);
                await commitInsert(poitypeBufStr, db);
                // reset buffer strings
                poiBufStr = poiSqlQuery;
                ptBufStr = ptSqlQuery;
                poitypeBufStr = poitypeSqlQuery;
                i = 0;
            }
            poiBufStr += formatForInsertPoi(poi);
            ptBufStr += formatForInsertPopularTimes(poi);
            poitypeBufStr += formatForInsertPoiType(poi);
            i+=168;
        }
        // If buffer stream is not empty commit one last time
        if(i !== 0) {
            await commitInsert(poiBufStr, db);
            poiBufStr = poiSqlQuery;
            await commitInsert(ptBufStr, db);
            poiBufStr = ptSqlQuery;
            await commitInsert(poitypeBufStr, db);
            poitypeBufStr = poitypeSqlQuery;
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
        if ((/^invalidPoiType:.*$/).test(err.message)) {
            msg += ` Details: ${err.message}`;
        }
        if (err.message == "NoField:fileLastModified") {
            msg += ` Details: ${err.message}`;
        }
        if ((/^Duplicate entry.*$/).test(err.message)) {
            msg += ` Details: ${err.message}`;
        }
        db.rollback();
        insertStatus.success = false;
        res.status(409).json({
            error: true,
            dbRollback: true,
            message: msg
        })
        console.log(err);

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
    try {
        safePoi = utilsPois.formatPoi(poi);
        insertStatus.rowsAttemped += 1;
        return(` ("${safePoi.id}", "${safePoi.name}", "${safePoi.address}", ${safePoi.lat}, ${safePoi.lng}, ${safePoi.rating}, ${safePoi.rating_n}),`);
    }
    catch(err) {
        throw err;
    }
}

function formatForInsertPopularTimes(poi) {
    let outStr = '';
    safePtArr = utilsPois.formatPopularTimes(poi);
    for (safePt of safePtArr) {
        outStr += ` ("${safePt.id}", ${safePt.day}, ${safePt.hour}, ${safePt.numOfPeople}),`
    }
    insertStatus.rowsAttemped += safePtArr.length;
    return outStr;
}

function formatForInsertPoiType(poi) {
    let outStr = '';
    for (type of poi.types) {
        outStr += ` ("${type}", "${poi.id}"),`;
    }
    return outStr;
}
