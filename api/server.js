//nmp run dev OR npm run start
const express = require('express');
const routes = require('./routes');
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);



const PORT = 8080;
app.listen(PORT, () => {console.log(`Server is listening on port ${PORT}..`);})