const db = require("../../db/connect").promise();

exports.visitsPerDay = async (req, res, next) => {
    const firstDate = req.body.firstDate;
    const endDate = req.body.endDate;
    
    try {
        const [rows] = await db.execute(`CALL visitsPerDay("${firstDate}", "${endDate}")`);
        return res.status(200).json({
            success: true,
            visits: rows[0]
        });
    }
    catch(err) {
        next(err);
    }
};

exports.covidVisitsPerDay = async (req, res, next) => {
    const firstDate = req.body.firstDate;
    const endDate = req.body.endDate;
    
    try {
        const [rows] = await db.execute(`CALL covidVisitsPerDay("${firstDate}", "${endDate}")`);
        return res.status(200).json({
            success: true,
            covidVisits: rows[0]
        });
    }
    catch(err) {
        next(err);
    }
};