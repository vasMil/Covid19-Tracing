const db = require("../db/connect").promise();

exports.dispStats = async (req, res, next) => {
    try {
        const [rows] = await db.execute(`CALL dispStats()`);
        let poi, covidpoi;
        let visitData = rows[3];
        const visitCovidData = rows[4];
        
        for (covidpoi of visitCovidData) {
            for (poi of visitData) {
                if (covidpoi.typeOfPOI === poi.typeOfPOI) {
                    poi.amountOfCovidVisits = covidpoi.amountOfCovidVisits;
                }
            }
        }
        for (poi of visitData) {
            if (!poi.amountOfCovidVisits) poi.amountOfCovidVisits = 0;
        }
        return res.status(200).json({
            success: true,
            totalVisits: rows[0][0].totalVisits,
            totalCovidCases: rows[1][0].totalCovidCases,
            totalVisitsFromCases: rows[2][0].totalVisitsFromCases,
            tableData: visitData
        });
    }
    catch(err) {
        next(err);
    }
};