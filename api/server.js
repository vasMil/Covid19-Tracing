//nmp run dev OR npm run start
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');
const {verifyUser, verifyAdmin} = require('./controllers/verifyUser');
const protectedUserRoutes = require('./protectedUserRoutes');
const protectedAdminRoutes = require('./protectedAdminRoutes');
const { adminChangesGuard } = require('./adminChangesGuard');

const app = express();
 // TODO: Uninstall bodyparser? Redundant since I am not receiving large body messages
app.use(bodyParser.json({limit: '1mb'}));
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(verifyUser);
app.use(protectedUserRoutes);
app.use(verifyAdmin);
app.use(protectedAdminRoutes);
app.use(adminChangesGuard);

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  });

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}: OK!`)
})