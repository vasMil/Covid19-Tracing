const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../../env/environment')
const db = require("../../db/connect").promise();

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

exports.updateUsernamePassword = async (req, res, next) => {
    const pass = !req.body.new_password ? "NULL" : `"${await bcrypt.hash(req.body.new_password, 10)}"`;
    const username = !req.body.new_username ? "NULL" : `"${req.body.new_username}"`;

    let resp_msg = {
        "invalid_password": undefined,
        "username_updated": undefined,
        "password_updated": undefined,
        "usernameUsed": undefined,
        "new_token": undefined
    };

    // Check if old_password is valid
    try {
        const [rows] = await db.execute(`SELECT users.password FROM user_table AS users WHERE users.user_id = ${req.locals.verifiedUser.id}`);
        if(!rows || !rows[0]) {
            return res.status(500).json({
                message: "Something went wrong!"
            });
        }
        if (!bcrypt.compareSync(req.body.old_password, rows[0].password)) {
            resp_msg.invalid_password = true;
            return res.status(200).json(resp_msg);
        }
    }
    catch(err) {
        return next(err);
    }

    try {
        const [rows] = await db.execute(`CALL update_username_password(
            ${req.locals.verifiedUser.id},
            ${username},
            ${pass})`);
        if (!rows || !rows[0] || !rows[0][0]) {
            res.status(500).json({
                message: "Something went wrong!"
            });
            return;
        }
        if(req.body.new_username) {
            resp_msg.username_updated = rows[0][0].success_username;
            resp_msg.usernameUsed = rows[0][0].usernameUsed;
            if(rows[0][0].success_username) {
                // Create a new token and pass it in resp_msg
                const token = jwt.sign({
                    id: req.locals.verifiedUser.id,
                    role: req.locals.verifiedUser.role,
                    username: req.body.new_username
                }, env.jwtSecret, { expiresIn: '24h' });
                resp_msg.new_token = token;
            }
        }
        if(req.body.new_password) {
            resp_msg.password_updated = rows[0][0].success_password;
        }
        return res.status(200).json(resp_msg);
    }
    catch(err) {
        next(err);
    }
}
