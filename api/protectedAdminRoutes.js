const protectedAdminRouter = require('express').Router();
const { insertPois } = require('./controllers/admin/insertPoisController');
const multer = require('multer');
const path = require('path');
const { deletePois } = require('./controllers/admin/deletePoisController');
const { updatePois } = require('./controllers/admin/updatePoisController');
const { dispStats } = require('./controllers/admin/dispStatsController');
const { visitsPerDay, covidVisitsPerDay } = require('./controllers/admin/visitsPerDayController');
const { visitsPerHour, covidVisitsPerHour } = require('./controllers/admin/visitsPerHourController');

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