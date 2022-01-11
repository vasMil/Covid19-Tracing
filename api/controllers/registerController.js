const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../db/connect').promise();

exports.register = async(req,res,next) => {
    

    // if(!errors.isEmpty()){
    //     return res.status(422).json({ errors: errors.array() });
    // }

    try{
        const [rows] = await conn.execute(`CALL register_user("${req.body.username}", "${req.body.email}", "${bcrypt.hash(req.body.password, 10)}")`);
        const row = rows[0];

        if (row.usernameUsed) {
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
        else if(row.emailUsed && row.usernameUsed) {
            res.status(200).json({
                success: false,
                emailUsed: true,
                usernameUsed: true
            });
        }
        else if(row.success) {
            
            //const hashPass = await bcrypt.hash(req.body.password, 10);
            //await conn.execute('UPDATE user_table SET password = ? WHERE username = ?',[hashPass, req.body.username]);
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