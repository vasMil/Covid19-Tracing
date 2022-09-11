const db = require("../db/connect").promise();

exports.dispStats_a_c = async (req, res, next) => {
    try {
        const [rows] = await db.execute(`CALL dispStats_a_c()`);
        //console.log(rows[0][0].totalVisits);
        return res.status(200).json({
            success: true,
            //rows: rows[0],
            totalVisits: rows[0][0].totalVisits,
            totalCovidCases: rows[0][0].totalCovidCases,
            totalVisitsFromCases: rows[0][0].totalVisitsFromCases
        });
    }
    catch(err) {
        next(err);
    }
};