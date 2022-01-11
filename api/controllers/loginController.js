const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const conn = require('../db/connect').promise();


exports.login = async (req,res,next) => {

    try{
        const [sql_res] = await conn.execute(`CALL verify_user("${req.body.username}", "${req.body.password}")`);
        const row = sql_res[0][0];
        if (row.length === 0) {
            res.status(422).json({
                success: false,
                message: "Invalid user!",
            });
        }
        let exp = null;
        if (req.body.rememberMe) {
            exp = "48h"
        }
        else {
            exp = "24h"
        }
        const userId = row.id;
        const role = row.isAdmin ? "admin" : "user";
        const username = row.username;
        
        const theToken = jwt.sign({
            id: userId,
            role: role,
            username: username
        },'the-super-strong-secrect',{ expiresIn: exp });

        res.status(200).json(
            {
                success: true,
                token: theToken
            });
    }
    catch(err){
        next(err);
    }
}