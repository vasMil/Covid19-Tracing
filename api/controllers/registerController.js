const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../db/connect').promise();

exports.register = async(req,res,next) => {

    try{
        const passHash = await bcrypt.hash(req.body.password, 10);
        console.log(passHash);
        const [rows] = await conn.execute(`CALL register_user("${req.body.username}", "${req.body.email}", "${passHash}")`);
        const row = rows[0][0];

        if(row.emailUsed && row.usernameUsed) {
            res.status(200).json({
                success: false,
                emailUsed: true,
                usernameUsed: true
            });
        }
        else if (row.usernameUsed) {
            res.status(200).json({
                success: false,
                emailUsed: false,
                usernameUsed: true
            });
        }
        else if(row.emailUsed) {
            res.status(200).json({
                success: false,
                emailUsed: true,
                usernameUsed: false
            });
        }

        else {
            res.status(200).json({
                success: true,
                emailUsed: false,
                usernameUsed: false
            });
        }
        
    }catch(err){
        next(err);
    }
}