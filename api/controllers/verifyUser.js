const jwt = require('jsonwebtoken');
const env = require('../env/environment');

exports.verifyUser = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    }
    // Bearer token
    const bearerHeader = req.headers.authorization;
    // Split on the first space, and get the second part (the token)
    const jwtToken = bearerHeader.split(' ')[1];
    jwt.verify(jwtToken, env.jwtSecret, {
        algorithms: ["HS256", "HS384"]
    }, (err, dec) => {
        if(err) {
            // TODO: Log error
            return res.status(401).json({
                error: "Invalid token!"
            });
        }
        req.locals = {
            authenticated: true,
            verifiedUser: {
                id: dec.id,
                role: dec.role,
                username: dec.username
            }
        };
    })
    next();
}

exports.verifyAdmin = (req, res, next) => {
    if (req.locals.verifiedUser.role !== "admin") {
        return res.status(401).json({
            error: true,
            message: "You are not authorized!",
        })
    }
    req.locals.verifiedAdmin = true;
    next();
}