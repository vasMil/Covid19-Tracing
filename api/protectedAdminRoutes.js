const protectedAdminRouter = require('express').Router();
const { insertPois } = require('./controllers/poiController');
const multer = require('multer');
const path = require('path')

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

module.exports = protectedAdminRouter;