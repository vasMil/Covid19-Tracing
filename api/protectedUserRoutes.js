const protectedUserRouter = require('express').Router();
const { searchPoi } = require('./controllers/searchPoiController');
const { reportCase } = require('./controllers/reportCaseController');
const { getPoisWhereExposedToCovid } = require('./controllers/exposureController');

protectedUserRouter.get('/pois/search/', searchPoi);
protectedUserRouter.post('/report-case/', reportCase);
protectedUserRouter.get('/pois-exposed-user-to-covid/', getPoisWhereExposedToCovid);

module.exports = protectedUserRouter;