const db = require("../../db/connect").promise();

exports.reportCase = async (req, res, next) => {
    const userId = req.locals.verifiedUser.id;
    const date = req.body.dayReportedPositive;
    try {
        if (Date.parse(date) === NaN) throw "InvalidDate"
        const [rows] = await db.execute(`CALL registerCovidCase(${userId}, "${date}");`);
        const row = rows[0][0];
        if(!row.success) {
            return res.status(200).json({
                success: false,
                wasRegistered: null
            });
        }
        if(row.alreadyRegistered) {
            return res.status(200).json({
                success: true,
                wasRegistered: true
            });
        }
        return res.status(200).json({
            success: true,
            wasRegistered: false
        });

    }
    catch(err) {
        if(err.message == "InvalidDate") {
            res.status(200).json({
                success: false,
                error: "InvalidDate"
            });
        }
        console.log(err);
        next(err);
    }
}