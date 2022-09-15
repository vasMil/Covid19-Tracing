const db = require("../db/connect").promise();

exports.visitsPerDay = async (req, res, next) => {
    const firstDate = req.body.firstDate;
    const endDate = req.body.endDate;
    
    try {
        const [rows] = await db.execute(`CALL visitsPerDay("${firstDate}", "${endDate}")`);
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