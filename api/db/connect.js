const mysql = require('mysql2')
const env = require('../env/environment')

const connection = mysql.createConnection(env.dbConfig);

connection.connect(error => {
    if(error) throw error;
    console.log("DB Connection: OK!");
})

module.exports = connection;