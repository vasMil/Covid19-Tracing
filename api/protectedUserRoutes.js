const protectedUserRouter = require('express').Router();
const { searchPoi } = require('./controllers/searchPoiController');

protectedUserRouter.get('/pois/search/', searchPoi);

module.exports = protectedUserRouter;