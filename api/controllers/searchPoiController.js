const db = require('../db/connect').promise();

exports.searchPoi = async (req, res, next) => {
    // TODO: check if search is ok
    try {
        const rows = await db.execute(
            `SELECT poi_table.id, poi_table.name, poi_table.address, poi_table.latitude,
            poi_table.longitude, poi_table.rating, poi_table.rating_n, poi_table.poi_type,
            popular_times_table.number_of_people
            FROM poi_table
            INNER JOIN popular_times_table ON poi_table.id = popular_times_table.poi_id
            WHERE poi_table.poi_type LIKE "%${req.query.type}%"
            AND popular_times_table.day = ${req.query.day}
            AND popular_times_table.hour = ${req.query.hour};`);

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