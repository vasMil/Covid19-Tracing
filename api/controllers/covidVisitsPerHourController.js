const db = require("../db/connect").promise();

exports.covidVisitsPerHour = async (req, res, next) => {
    const Date = req.body.Date;
    
    try {
        const [rows] = await db.execute(`CALL covidVisitsPerHour("${Date}")`);
        //console.log(rows);
        return res.status(200).json({
            success: true,
            rows: rows
        });
    }
    catch(err) {
        next(err);
    }
};