const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'apiUser',
    password: 'ceid2022',
    database: 'database_ct'
})

connection.connect(error => {
    if(error) throw error;
    console.log("successfull connection to database");
})

module.exports = connection;