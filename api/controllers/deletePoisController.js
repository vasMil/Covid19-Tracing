const db = require("../db/connect").promise();

const deleteStatus = {
    type: "DELETE",
    rowsAttemped: 0,
    success: false,
    fileLastModified: null,
    filename: null
}

exports.deletePois = async (req, res, next) => {
    await db.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    await db.beginTransaction();
    try {
        deleteStatus.rowsAttemped = 0;
        const [visitRows] = await db.execute(`DELETE FROM visit_table;`);
        deleteStatus.rowsAttemped += visitRows.affectedRows;
        const [ptRows] = await db.execute(`DELETE FROM popular_times_table;`);
        deleteStatus.rowsAttemped += ptRows.affectedRows;
        const [poiTypeRows] = await db.execute(`DELETE FROM poi_type;`);
        deleteStatus.rowsAttemped += poiTypeRows.affectedRows;
        const [poiRows] = await db.execute(`DELETE FROM poi_table;`);
        deleteStatus.rowsAttemped += poiRows.affectedRows;
        await db.commit();
        deleteStatus.success = true;
        res.status(200).json({
            success: true,
            message: "visit_table, popular_times_table, poi_type and poi_table DROPPED!"
        });
    }
    catch(err) {
        db.rollback();
        res.status(400).json({
            success: false,
            message: `Action Failed, db rolled back! Error: ${err.message}`
        });
    }
    req.locals.dbStatus = deleteStatus;
    next();
}