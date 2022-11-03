// base routes page
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_NAME,
        // add your SQL password here
        password: process.env.SECRET_KEY,
        database: process.env.DB_LOCATION
    },
    console.log(`Connected to the employees database.`)
);

module.exports = {db}