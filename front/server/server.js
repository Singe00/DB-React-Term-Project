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
			var sql =
				"SELECT * FROM game LEFT JOIN image ON game.id=image.game_id WHERE gname='" +
				search +
				"';";
		} else if (req.body.opt == 2) {
			var sql =
				"SELECT * FROM game LEFT JOIN image ON image.game_id=game.id WHERE genre='" +
				search +
				"';";
		} else if (req.body.opt == 3) {
			var sql =
				"SELECT * FROM game LEFT JOIN image ON image.game_id=game.id WHERE make='" +
				search +
				"';";
		}
	} else {
		var sql = 'SELECT * FROM game LEFT JOIN image ON game.id=image.game_id';
	}

	db.query(sql, (err, data) => {
		if (!err) res.send(data);
		else res.send(err);
	});
});

app.post('/api/review', (req, res) => {
	var id = req.body.id;
	var sql =
		"SELECT * FROM review LEFT JOIN userInfo ON userInfo.userKey=review.reviewUserKey JOIN image ON review.reviewGameKey=image.game_id WHERE reviewGameKey='" +
		id +
		"';";

	db.query(sql, (err, data) => {
		if (!err) res.send(data);
		else res.send(err);
	});
});

app.post('/api/showreview', (req, res) => {
	var id = req.body.id;
	var sql =
		"SELECT * FROM review LEFT JOIN userInfo ON userInfo.userKey=review.reviewUserKey JOIN image ON review.reviewGameKey=image.game_id WHERE reviewNumber='" +
		id +
		"';";

	db.query(sql, (err, data) => {
		if (!err) res.send(data);
		else res.send(err);
	});
});

app.post('/api/reviewtext', (req, res) => {
	var opt = req.body.opt;
	var star = req.body.star;
	var title = req.body.title;
	var reviewtext = req.body.reviewtext;
	var userID = req.body.userID;

	var query = 'SELECT * FROM review WHERE reviewGameKey = ? AND reviewUserKey = ?';
	db.query(query, [opt, userID], function (err, rows) {
		if (rows.length == 0) {
			var sql = {
				reviewTitle: title,
				reviewDetail: reviewtext,
				reviewUserKey: userID,
				reviewGameKey: opt,
				reviewScore: star,
			};

			var query = db.query('insert into review set ?', sql, function (err, rows) {
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

app.post('/api/reg', cors(), async (req, res) => {
	var name = req.body.name;
	var id = req.body.ID;
	var pw = req.body.password;

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
			res.sendStatus(403);
		} else {
			if (pw == result[0].pw) {
				res.send(result);
			} else {
				res.sendStatus(403);
			}
		}
	});
});

app.post('/api/deleteReview', cors(), async (req, res) => {
	var rn = req.body.reviewNum;
	var uid = req.body.userID;

	var query = "SELECT * FROM review where reviewNumber='" + rn + "';";
	db.query(query, function (err, rows) {
		if (rows[0].reviewUserKey == uid) {
			db.query('delete from review where reviewNumber=?', [rn], function () {
				console.log('sadasdadsadad');
				res.send({ ok: true });
			});
		} else {
			res.sendStatus(403);
		}
	});
});

app.post('/api/editReview', cors(), async (req, res) => {
	var rn = req.body.reviewNum;
	var uid = req.body.userID;

	var query = "SELECT * FROM review where reviewNumber='" + rn + "';";
	db.query(query, function (err, rows) {
		if (rows[0].reviewUserKey == uid) {
			console.log(rows);
			res.send(rows);
		} else {
			res.sendStatus(403);
		}
	});
});

app.post('/api/edit', (req, res) => {
	var rn = req.body.rn;
	var opt = req.body.opt;
	var star = req.body.star;
	var title = req.body.title;
	var reviewtext = req.body.reviewtext;
	var userID = req.body.userID;
	var sql =
		'UPDATE review SET reviewTitle = ?, reviewDetail = ?, reviewScore=? WHERE reviewNumber=?';
	var params = [title, reviewtext, star, rn];
	db.query(sql, params, (err, result) => {
		if (err) {
			res.sendStatus(403);
		} else {
			res.send({ ok: true });
		}
	});
});

app.post('/api/comment', cors(), async (req, res) => {
	var commenttext = req.body.commenttext;
	var id = req.body.userID;
	var rn = req.body.rn;
	var sql = {
		commentDetail: commenttext,
		commentUserKey: id,
		commentReviewKey: rn,
	};

	var query = db.query('insert into comment set ?', sql, function (err, rows) {
		if (err) throw err;
		else {
			var query =
				"SELECT * FROM comment LEFT JOIN userInfo ON userInfo.userKey=comment.commentUserKey where commentReviewKey='" +
				rn +
				"';";
			db.query(query, function (err, rows) {
				if (err) throw err;
				else {
					res.send(rows);
				}
			});
		}
	});
});

app.post('/api/showcomment', cors(), async (req, res) => {
	var uid = req.body.uid;
	var rn = req.body.rn;
	
	db.query(
		'SELECT * FROM comment LEFT JOIN userInfo ON userInfo.userKey=comment.commentUserKey where commentReviewKey=?',
		[rn],
		function (err, rows) {
			console.log(rows);
			if (err) throw err;
			else {
				res.send(rows);
			}
		}
	);
});

app.post('/api/deleteComment', cors(), async (req, res) => {
	var commentNum = req.body.commentNum;
	var uid = req.body.userID;
	var ren = req.body.rn;
	var query = "SELECT * FROM comment where commentNumber='" + commentNum + "';";
	db.query(query, function (err, rows) {
		if (rows[0].commentUserKey == uid) {
			db.query('delete from comment where commentNumber=?', [commentNum], function (
				err,
				result
			) {
				if (err) {
					res.sendStatus(403);
				} else {
					db.query(
						'SELECT * FROM comment LEFT JOIN userInfo ON userInfo.userKey=comment.commentUserKey where commentReviewKey=?',
						[ren],
						function (err, rows2) {
							if (err) throw err;
							else {
								console.log(rows2);
								res.send(rows2);
							}
						}
					);
				}
			});
		} else {
			res.sendStatus(403);
		}
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});