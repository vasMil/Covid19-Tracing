const protectedAdminRouter = require('express').Router();
const { insertPois } = require('./controllers/insertPoisController');
const multer = require('multer');
const path = require('path');
const { deletePois } = require('./controllers/deletePoisController');
const { updatePois } = require('./controllers/updatePoisController');
const { dispStats } = require('./controllers/dispStatsController');
const { visitsPerDay } = require('./controllers/visitsPerDayController');
const { covidVisitsPerDay } = require('./controllers/covidVisitsPerDayController');
const { visitsPerHour } = require('./controllers/visitsPerHourController');
const { covidVisitsPerHour } = require('./controllers/covidVisitsPerHourController');

// Credits: https://stackoverflow.com/questions/31592726/how-to-store-a-file-with-file-extension-with-multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../adminUploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
});

const upload = multer({ storage: storage });


protectedAdminRouter.post('/insert-pois', upload.single('pois'), insertPois);
protectedAdminRouter.put('/update-pois', upload.single('pois') , updatePois);
protectedAdminRouter.delete('/delete-pois', deletePois);
protectedAdminRouter.get('/disp-stats', dispStats);
protectedAdminRouter.post('/visits-per-day', visitsPerDay);
protectedAdminRouter.post('/covid-visits-per-day', covidVisitsPerDay);
protectedAdminRouter.post('/visits-per-hour', visitsPerHour);
protectedAdminRouter.post('/covid-visits-per-hour', covidVisitsPerHour);

module.exports = protectedAdminRouter;