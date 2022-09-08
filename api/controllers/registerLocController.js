const db = require("../db/connect").promise();

exports.registerCurrentPOI = async (req, res, next) => {
    const date_time = req.body.time;
    const poi_name = req.body.name;
    const poi_address = req.body.address;
    const estim = req.body.estimation;

    try {
        const [rows] = await db.execute(`CALL register_location (${req.locals.verifiedUser.id}, "${poi_name}", "${poi_address}", ${estim}, "${date_time}")`);
        
        if (!rows || !rows[0] || !rows[0][0]) {
            res.status(500).json({
                message: "Something went wrong!"
            });
            return;
        }
        
        return res.status(200).json({
                "success": rows[0][0].success,
                "IsRegistered": rows[0][0].IsRegistered
            });
    }
    catch(err) {
        next(err);
    }
};