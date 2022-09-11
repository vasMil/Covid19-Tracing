const db = require("../db/connect").promise();

exports.dispStats_d = async (req, res, next) => {
    try {
        const [rows] = await db.execute(`CALL `);
        //console.log(rows[0][0].totalVisits);
        return res.status(200).json({
            success: true,
            rows: rows[0]
        });
    }
    catch(err) {
        next(err);
    }
};