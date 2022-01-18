const protectedUserRouter = require('express').Router();
const { searchPoi } = require('./controllers/searchPoiController');
const { reportCase } = require('./controllers/reportCaseController');

protectedUserRouter.get('/pois/search/', searchPoi);
protectedUserRouter.post('/report-case/', reportCase);


module.exports = protectedUserRouter;