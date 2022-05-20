var mysql = require('mysql');

const db = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'mysql',
    database : 'db'
});

module.exports = db;