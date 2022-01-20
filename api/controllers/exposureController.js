const db = require("../db/connect").promise();

exports.getPoisWhereExposedToCovid = async (req, res, next) => {
    try {
        const [rows] = await db.execute(`CALL getVisits_ExposedUserToCovid(${req.locals.verifiedUser.id})`);
        if (!rows[0] || !rows[0][0]) {
            return res.status(200).json({
                success: true,
                rows: null
            });
        }
        return res.status(200).json({
            success: true,
            rows: rows[0][0]
        });
    }
    catch(err) {
        next(err);
    }
};