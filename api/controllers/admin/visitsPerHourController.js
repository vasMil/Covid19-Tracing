const db = require("../../db/connect").promise();

exports.visitsPerHour = async (req, res, next) => {
    const Date = req.body.Date;
    
    try {
        const [rows] = await db.execute(`CALL visitsPerHour("${Date}")`);
        return res.status(200).json({
            success: true,
            visits: rows[0]
        });
    }
    catch(err) {
        next(err);
    }
};

exports.covidVisitsPerHour = async (req, res, next) => {
    const Date = req.body.Date;
    
    try {
        const [rows] = await db.execute(`CALL covidVisitsPerHour("${Date}")`);
        return res.status(200).json({
            success: true,
            covidVisits: rows[0]
        });
    }
    catch(err) {
        next(err);
    }
};