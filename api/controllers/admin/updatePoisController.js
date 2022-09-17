const db = require("../../db/connect").promise();
const utilsPois = require("../../utils/utils_pois");
const {readFile} = require('fs').promises;

const updateStatus = {
    type: "UPDATE",
    rowsAttemped: 0,
    success: false,
    fileLastModified: "",
    filename: ""
}

exports.updatePois = async (req, res, next) => {
    let invalidPois = [];
    updateStatus.rowsAttemped = 0;
    updateStatus.fileLastModified = req.body.last_modified;
    updateStatus.filename = req.file.originalname;
    await db.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    await db.beginTransaction();
    try {
        await isValidFile(updateStatus.filename, updateStatus.fileLastModified);
        // Read File
        const poiStr = await readFile(req.file.path, 'utf8');
        const poiArr = JSON.parse(poiStr);

        // For each line in the input file
        for (let poi of poiArr) {
            // Update in db
            let safePoi = utilsPois.formatPoi(poi);
            let queryRes = await db.execute(`
                UPDATE poi_table
                SET name = "${safePoi.name}", address = "${safePoi.address}", latitude = ${safePoi.lat}, longitude = ${safePoi.lng}, 
                    rating = ${safePoi.rating}, rating_n = ${safePoi.rating_n}
                WHERE id="${safePoi.id}"`);
            // Check if affectedRows === 0 => preserve poi_id
            if (queryRes[0].affectedRows === 0) {
                invalidPois.push(safePoi.id);
                continue;
            }
            // Update popular times
            safePtArr = utilsPois.formatPopularTimes(poi);
            let changedRows = 0;
            for (safePt of safePtArr) {
                let ptQueryRes = await db.execute(`
                UPDATE popular_times_table
                SET number_of_people = ${safePt.numOfPeople}
                WHERE poi_id = "${safePt.id}" AND day = ${safePt.day} AND hour = ${safePt.hour}
                `);
                changedRows += ptQueryRes[0].changedRows;
            }

            // Update poi_types (delete the old and insert the new)
            let poitypeDeleteQueryRes = await db.execute(`
                DELETE FROM poi_type
                WHERE poi_id = "${poi.id}";
            `);
            let poiTypeInsertStatement = `INSERT INTO poi_type (type, poi_id) VALUES`;
            for (let type of poi.types) {
                poiTypeInsertStatement += ` ("${type}", "${poi.id}"),`;
            }
            poiTypeInsertStatement = poiTypeInsertStatement.slice(0, -1) + ';'
            let poitypeInsertQueryRes = await db.execute(poiTypeInsertStatement);
            // rowsAttempted += Rows affected
            updateStatus.rowsAttemped += queryRes[0].changedRows;
            updateStatus.rowsAttemped += changedRows;
            updateStatus.rowsAttemped += poitypeInsertQueryRes[0].affectedRows;
            updateStatus.rowsAttemped += poitypeDeleteQueryRes[0].affectedRows;
        }

        await db.commit();
        updateStatus.success = true;
        let msg = null;
        if (invalidPois.length) {
            msg = `The POIs with the below ids where not found and thus not updated: ${invalidPois}`
        }
        res.status(200).json({
            success: true,
            message: msg
        });
    }
    catch(err) {
        db.rollback();
        res.status(400).json({
            success: false,
            message: `Action Failed, db rolled back! Error: ${err.message}`
        });
    }
    req.locals.dbStatus = updateStatus;
    next();
}

// A file will be considered as valid if:
// There is already a record of the file in admin_changes_table (either an insert and an update or just an insert).
// (All insert and update records before a delete statement are ignored.)
// And the file_last_mod table field has a value smaller than the last_modified request field.
// Note: That does not ensure that the update will succeed!
async function isValidFile(filename, last_mod) {
    try {
        const [rows] = await db.execute(`CALL getLastModifiedDate("${filename}")`);
        const row = rows[0][0];
        if (!row) {
            throw Error("Invalid File! Filename not in db!");
        }
        let db_last_mod = row.file_last_mod;
        if (Date.parse(last_mod) < Date.parse(db_last_mod)) {
            throw Error("Invalid File! A newer version of this file already in db!");
        }
        else if (Date.parse(last_mod) === Date.parse(db_last_mod)) {
            throw Error("File hasn't been updated since uploaded to db!");
        }
        // console.log(`last_mod: ${Date.parse(last_mod)}\ndb_last_mod: ${Date.parse(db_last_mod)}`);
    }
    catch(err) {
        throw err;
    }
}