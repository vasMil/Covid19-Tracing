const protectedUserRouter = require('express').Router();
const { searchPoi } = require('./controllers/searchPoiController');
const { reportCase } = require('./controllers/reportCaseController');
const { getPoisWhereExposedToCovid } = require('./controllers/exposureController');
const { registerCurrentPOI } = require('./controllers/registerLocController');

protectedUserRouter.get('/pois/search/', searchPoi);
protectedUserRouter.post('/report-case/', reportCase);
protectedUserRouter.get('/pois-exposed-user-to-covid/', getPoisWhereExposedToCovid);
protectedUserRouter.post('/register-location/', registerCurrentPOI);

module.exports = protectedUserRouter;