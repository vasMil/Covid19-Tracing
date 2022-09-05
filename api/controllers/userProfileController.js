const db = require("../db/connect").promise();

exports.getProfileInfo = async (req, res, next) => {
    let info = {
        "username": req.locals.verifiedUser.username,
        "email": "",
        "visited_pois": [],
        "was_positive_covid": []
    };
    try {
        const [rows] = await db.execute(`CALL getProfileInfo(${req.locals.verifiedUser.id})`);
        if (!rows || !rows[0] || !rows[1] || !rows[2]) {
            res.status(500).json({
                message: "Something went wrong!"
            });
            return;
        }
        if(!rows[0][0]) {
            res.status(500).json({
                message: "Something went wrong! Database returned no email!"
            });
            return;            
        }
        info.email = rows[0][0].email;
        info.visited_pois = rows[1];
        info.was_positive_covid = rows[2];
        
        return res.status(200).json(info);
    }
    catch(err) {
        next(err);
    }
}