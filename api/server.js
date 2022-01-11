//nmp run dev OR npm run start
const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(routes);

//handling errors
app.use((err, req, res, next) => {
    //console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message: err.message,
    });
});

const PORT = 8080;
app.listen(PORT, () => {console.log(`Server is listening on port ${PORT}..`);})