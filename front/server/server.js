const express = require('express');
const app = express();
const port = 5000; // <- 3000에서 다른 숫자로 변경
const cors = require('cors');
const db = require('./config/db');
const bodyParser = require('body-parser');
var mysql = require('mysql');
var request = require('request');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root', //mysql의 id
	password: 'mysql1234', //mysql의 password
	database: 'db', //사용할 데이터베이스
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	console.log('running');
	res.send('dddddd!');
});

app.post('/api/info', (req, res) => {
	var search = req.body.search;
	if (req.body.search != '') {
		if (req.body.opt == 1) {
			var sql = "SELECT * FROM game WHERE gname='" + search + "';";
		} else if (req.body.opt == 2) {
			var sql = "SELECT * FROM game WHERE genre='" + search + "';";
		} else if (req.body.opt == 3) {
			var sql = "SELECT * FROM game WHERE make='" + search + "';";
		}
	} else {
		var sql = 'SELECT * FROM game';
	}

	db.query(sql, (err, data) => {
		if (!err) res.send(data);
		else res.send(err);
	});
});

app.post('/api/review', (req, res) => {
	var id = req.body.id
	var sql = "SELECT * FROM review WHERE reviewGameKey='" + id + "';";
	
	db.query(sql, (err, data) => {
		if (!err) res.send(data);
		else res.send(err);
	});
});

app.post('/api/reg', cors(), async (req, res) => {
	var name = req.body.name;
	var id = req.body.ID;
	var pw = req.body.password;
	var param = [name, id, pw];

	var query = "SELECT userId FROM userInfo where userId='" + id + "';";
	db.query(query, function (err, rows) {
		if (rows.length == 0) {
			var sql = {
				userName: name,
				userId: id,
				pw: pw,
			};

			var query = db.query('insert into userInfo set ?', sql, function (err, rows) {
				if (err) throw err;
				else {
					res.send({ ok: true });
				}
			});
		} else {
			res.sendStatus(403);
		}
	});
});

app.post('/api/login', cors(), async (req, res) => {
	var id = req.body.ID;
	var pw = req.body.password;

	db.query('select * from userInfo where userId=?', id, function (err, result) {
		if (result.length == 0) {
			console.log('ID Error');
			res.sendStatus(403);
		} else {
			if (pw == result[0].pw) {
				console.log('로그인 성공');
				res.send({ ok: true });
			} else {
				console.log('PW Error');
				res.sendStatus(403);
			}
		}
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});