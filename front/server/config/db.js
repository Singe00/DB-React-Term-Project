var mysql = require('mysql');

const db = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'mysql1234',
    database : 'db'
});

module.exports = db;