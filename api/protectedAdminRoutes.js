const protectedAdminRouter = require('express').Router();
const { insertPois } = require('./controllers/insertPoisController');
const multer = require('multer');
const path = require('path');
const { deletePois } = require('./controllers/deletePoisController');

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
protectedAdminRouter.delete('/delete-pois', deletePois);

module.exports = protectedAdminRouter;