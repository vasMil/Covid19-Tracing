const db = require("../db/connect").promise();

exports.getPoisWhereExposedToCovid = async (req, res, next) => {
    try {
        const [rows] = await db.execute(`CALL getVisits_ExposedUserToCovid(${req.locals.verifiedUser.id})`);
        return res.status(200).json({
            success: true,
            rows: rows[0]
        });
    }
    catch(err) {
        next(err);
    }
};