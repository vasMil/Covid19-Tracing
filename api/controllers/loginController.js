const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const conn = require('../db/connect').promise();
const env = require('../env/environment')


exports.login = async (req,res,next) => {

    try{
        const [rows] = await conn.execute(`CALL retrieve_userData("${req.body.username}")`);
        if (!rows[0] || !rows[0][0]) {
            res.status(200).json({
                success: false,
                message: "Invalid user!"
            });
            return;
        }
        const row = rows[0][0];
        if (!bcrypt.compareSync(req.body.password, row.hashedPass)) {
            res.status(200).json({
                success: false,
                message: "Invalid user!"
            });
            return;
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
        },
        env.jwtSecret,
        { expiresIn: exp });

        if (role !== "admin") {
            res.status(200).json(
                {
                    success: true,
                    token: theToken,
                    redirectTo: env.frontendRootAddress + "src/app/home-page/home.php"
                });
        }
        else if (role == "user") {
            res.status(200).json(
                {
                    success: true,
                    token: theToken,
                    redirectTo: env.frontendRootAddress + "" // TODO: "Add redirect link to the admin CRUD operations page"
                });
        }
    }
    catch(err){
        next(err);
    }
}