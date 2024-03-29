const bcrypt = require('bcryptjs');
const conn = require('../db/connect').promise();

exports.register = async(req,res,next) => {

    try{
        const passHash = await bcrypt.hash(req.body.password, 10);
        const [rows] = await conn.execute(`CALL register_user("${req.body.username}", "${req.body.email}", "${passHash}")`);
        if (!rows || !rows[0] || !rows[0][0]) {
            res.status(500).json({
                message: "Something went wrong!"
            });
            return;
        }
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