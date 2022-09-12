const db = require("../db/connect").promise();

exports.dispStats = async (req, res, next) => {
    try {
        const [rows] = await db.execute(`CALL dispStats()`);
        console.log(rows[0][1]);
        return res.status(200).json({
            success: true,
            //rows: rows[0],
            totalVisits: rows[0][0].totalVisits,
            totalCovidCases: rows[1][0].totalCovidCases,
            totalVisitsFromCases: rows[2][0].totalVisitsFromCases
        });
    }
    catch(err) {
        next(err);
    }
};