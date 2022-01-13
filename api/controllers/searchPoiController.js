const conn = require('../db/connect').promise();

exports.searchPoi = async (req, res, next) => {
    res.status(200).json({
        message: "OK"
    })
}