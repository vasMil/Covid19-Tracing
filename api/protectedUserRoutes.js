const protectedUserRouter = require('express').Router();
const { searchPoi } = require('./controllers/user/searchPoiController');
const { reportCase } = require('./controllers/user/reportCaseController');
const { getPoisWhereExposedToCovid } = require('./controllers/user/exposureController');
const { getProfileInfo, updateUsernamePassword } = require('./controllers/user/userProfileController');
const { registerCurrentPOI } = require('./controllers/user/registerLocController');

protectedUserRouter.get('/pois/search/', searchPoi);
protectedUserRouter.post('/report-case/', reportCase);
protectedUserRouter.get('/pois-exposed-user-to-covid/', getPoisWhereExposedToCovid);
protectedUserRouter.get('/user-profile/', getProfileInfo);
protectedUserRouter.put('/user-profile/', updateUsernamePassword);
protectedUserRouter.post('/register-location/', registerCurrentPOI);

module.exports = protectedUserRouter;