const db = require("../db/connect").promise();

exports.visitsPerHour = async (req, res, next) => {
    const Date = req.body.Date;
    
    try {
        const [rows] = await db.execute(`CALL visitsPerHour("${Date}")`);
        console.log(rows[0][1]);
        return res.status(200).json({
            success: true,
            rows: rows
        });
    }
    catch(err) {
        next(err);
    }
};