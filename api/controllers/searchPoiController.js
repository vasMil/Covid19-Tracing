const db = require('../db/connect').promise();

exports.searchPoi = async (req, res, next) => {
    // TODO: check if search is ok
    try {
        const rows = await db.execute(`SELECT * FROM poi_table WHERE poi_table.poi_type LIKE "%${req.query.type}%";`);

        if (!rows[0], !rows[0][0]) return res.status(200).json({ rows: null, message: "Poi Not Found" });

         return res.status(200).json({rows: rows[0], message: "Pois Found!"});
    }
    catch (err) {
        // TODO: log errors
        console.log(err);
        return res.status(500).json({
            error: true,
            message: "Query failed!"
        });
    }
}