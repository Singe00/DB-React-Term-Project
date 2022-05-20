const express = require('express')
const app = express()
const port = 5000 // <- 3000에서 다른 숫자로 변경
const cors = require("cors");
const db = require('./config/db');
const bodyParser = require("body-parser");
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : "localhost",
    user : "root", //mysql의 id
    password : "mysql1234", //mysql의 password
    database : "db", //사용할 데이터베이스
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	console.log("running")
  res.send('dddddd!')
})

app.get('/api/info', (req, res) => {
    db.query("SELECT * FROM game", (err, data) => {
        if(!err) res.send({ products : data });
        else res.send(err);
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})