const express = require('express')
const app = express()
const port = 5000 // <- 3000에서 다른 숫자로 변경
const cors = require("cors");
const db = require('./config/db');
const bodyParser = require("body-parser");
var mysql = require('mysql');
var request = require('request');

var connection = mysql.createConnection({
    host : "localhost",
    user : "root", //mysql의 id
    password : "mysql1234", //mysql의 password
    database : "db", //사용할 데이터베이스
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	console.log("running")
  res.send('dddddd!')
})

app.get('/api/info', (req, res) => {
    db.query("SELECT * FROM company", (err, data) => {
        if(!err) res.send({ products : data });
        else res.send(err);
    })
})

app.post("/api/reg",cors(), async (req,res)=>{
	var name = req.body.name
	var id = req.body.ID
	var pw = req.body.password
	var param = [name,id,pw];
	
	var query = "SELECT userId FROM userInfo where userId='"+id+"';";
	db.query(query,function(err,rows) {
		if (rows.length==0){
				var sql={
				userName:name,
				userId:id,
				pw:pw
			}

			var query = db.query('insert into userInfo set ?',sql,function(err,rows){
				if(err)throw err;
				else {
					res.send({ok:true})
				}
			})
		}else {
		}
	})

	
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})