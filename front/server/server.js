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

//20181131 조시완
app.post('/api/info', (req, res) => {
	var search = req.body.search; //검색내용
	if (req.body.search != '') {
		if (req.body.opt == 1) {//이름 옵션 쿼리문
			var sql =
				"SELECT * FROM game LEFT JOIN image ON game.id=image.game_id WHERE gname='" +
				search +
				"';";
		} else if (req.body.opt == 2) {//장리 옵션 쿼리문
			var sql =
				"SELECT * FROM game LEFT JOIN image ON image.game_id=game.id WHERE genre='" +
				search +
				"';";
		} else if (req.body.opt == 3) {//제작사 옵션 쿼리문
			var sql =
				"SELECT * FROM game LEFT JOIN image ON image.game_id=game.id WHERE make='" +
				search +
				"';";
		}
	} else {
		var sql = 'SELECT * FROM game LEFT JOIN image ON game.id=image.game_id';//기본 쿼리문 모든 게임 출력
	}

	db.query(sql, (err, data) => { //해당하는 쿼리문 전달
		if (!err) res.send(data); //성공 시 DB데이터 전송
		else res.send(err); //에러
	});
});

//20181131 조시완
app.post('/api/review', (req, res) => {
	var id = req.body.id; //리뷰 넘버로 검색
	var sql = //리스트 쿼리문 현재 리뷰 넘버로 작성된 리뷰들을 조인
		"SELECT * FROM review LEFT JOIN userInfo ON userInfo.userKey=review.reviewUserKey JOIN image ON review.reviewGameKey=image.game_id WHERE reviewGameKey='" +
		id +
		"';";

	db.query(sql, (err, data) => { //해당하는 리뷰 전달
		if (!err) res.send(data); //성공
		else res.send(err); //에러
	});
});
//20181131 조시완
app.post('/api/showreview', (req, res) => {
	var id = req.body.id;
	var sql = //리스트 상세내용 출력
		"SELECT * FROM review LEFT JOIN userInfo ON userInfo.userKey=review.reviewUserKey JOIN image ON review.reviewGameKey=image.game_id WHERE reviewNumber='" +
		id +
		"';";

	db.query(sql, (err, data) => {
		if (!err){//성공시
			console.log(data);
			res.send(data); //응답
		} 
		else res.send(err);//실패시 에러
	});
});
//20181131 조시완
app.post('/api/reviewtext', (req, res) => {
	console.log(req.body);
	var opt = req.body.opt;
	var star = req.body.star;
	var title = req.body.title;
	var reviewtext = req.body.reviewtext;
	var userID = req.body.userID;
	//작성한 리뷰 여부 확인 쿼리
	var query = 'SELECT * FROM review WHERE reviewGameKey = ? AND reviewUserKey = ?';
	db.query(query, [opt, userID], function (err, rows) { //작성기록확인
		if (rows.length == 0) {//작성한 리뷰가 없다면
			var sql = {
				reviewTitle: title,
				reviewDetail: reviewtext,
				reviewUserKey: userID,
				reviewGameKey: opt,
				reviewScore: star,
			};
			//작성한 리뷰 DB에 저장
			var query = db.query('insert into review set ?', sql, function (err, rows) {
				if (err) throw err;//실패시 에러
				else {//성공시 응답
					res.send({ ok: true });
				}
			});
		} else { // 이미 작성한 리뷰가 있다면
			res.sendStatus(403);//에러
		}
	});
});

//20181131 조시완
app.post('/api/reg', cors(), async (req, res) => {
	console.log(req.body);
	var name = req.body.name; //이름
	var id = req.body.ID; //아이디
	var pw = req.body.password; //비밀번호
	//아이디 중복 검사 query문
	var query = "SELECT userId FROM userInfo where userId='" + id + "';";
	db.query(query, function (err, rows) {
		if (rows.length == 0) { //중복아님
			var sql = {
				userName: name,
				userId: id,
				pw: pw,
			};
			//DB에 사용자 정보 입력
			var query = db.query('insert into userInfo set ?', sql, function (err, rows) {
				if (err) throw err;
				else {
					res.send({ ok: true });
				}
			});
		} else {//중복시 에러
			res.sendStatus(403);
		}
	});
});

//20181131 조시완
app.post('/api/login', cors(), async (req, res) => {
	var id = req.body.ID;	//아이디
	var pw = req.body.password; //비밀번호
	console.log(req.body);
	//아이디로 DB에서 검색
	db.query('select * from userInfo where userId=?', id, function (err, result) {
		if (result.length == 0) { //반환값이 없다면
			res.sendStatus(403); //에러
		} else {
			if (pw == result[0].pw) { //비밀번호 검사
				res.send(result); //성공
			} else {
				res.sendStatus(403); //비밀번호 틀림
			}
		}
	});
});

//게시글 삭제
app.post('/api/deleteReview', cors(), async (req, res) => {
	var rn = req.body.reviewNum;
	var uid = req.body.userID;
	//작성자 확인 쿼리문
	var query = "SELECT * FROM review where reviewNumber='" + rn + "';";
	db.query(query, function (err, rows) { 
		if (rows[0].reviewUserKey == uid) { //작성자가 일차한다면
			db.query('delete from review where reviewNumber=?', [rn], function () { //DB에서 삭제
				console.log('sadasdadsadad');
				res.send({ ok: true });
			});
		} else { //일치하지 않는다면
			res.sendStatus(403); //에러 전송
		}
	});
});
//게시글 수정
app.post('/api/editReview', cors(), async (req, res) => {
	var rn = req.body.reviewNum;
	var uid = req.body.userID;
	//작성자 확인 쿼리문
	var query = "SELECT * FROM review where reviewNumber='" + rn + "';";
	db.query(query, function (err, rows) { //작성자가 일치한다면
		if (rows[0].reviewUserKey == uid) {//정보와 같이 응답
			console.log(rows);
			res.send(rows);
		} else { //불일치라면
			res.sendStatus(403); //에러 전송
		}
	});
});
//게시글 수정내용 저장
app.post('/api/edit', (req, res) => {
	var rn = req.body.rn;
	var opt = req.body.opt;
	var star = req.body.star;
	var title = req.body.title;
	var reviewtext = req.body.reviewtext;
	var userID = req.body.userID;
	var sql = //수정 쿼리문 입력한 내용으로 DB 정보 업데이트
		'UPDATE review SET reviewTitle = ?, reviewDetail = ?, reviewScore=? WHERE reviewNumber=?';
	var params = [title, reviewtext, star, rn];
	db.query(sql, params, (err, result) => {
		if (err) {//실패시
			res.sendStatus(403); //에러
		} else { //성공시
			res.send({ ok: true }); //응답
		}
	});
});
//댓글 삽입
app.post('/api/comment', cors(), async (req, res) => {
	console.log(req.body);
	var commenttext = req.body.commenttext;
	var id = req.body.userID;
	var rn = req.body.rn;
	var sql = {
		commentDetail: commenttext,
		commentUserKey: id,
		commentReviewKey: rn,
	};
	//댓글 삽입 쿼리문
	var query = db.query('insert into comment set ?', sql, function (err, rows) {
		if (err) throw err; //에러라면 실패 응답
		else { //성공이라면
			var query = //댓글리스트 출력 쿼리문
				"SELECT * FROM comment LEFT JOIN userInfo ON userInfo.userKey=comment.commentUserKey where commentReviewKey='" +
				rn +
				"';";
			db.query(query, function (err, rows) {
				if (err) throw err; //실패시 에러
				else {//성공시
					res.send(rows); //응답
				}
			});
		}
	});
});
//댓글 리스트 출력
app.post('/api/showcomment', cors(), async (req, res) => {
	var uid = req.body.uid;
	var rn = req.body.rn;
	//댓글 리스트 출력 쿼리문
	db.query(
		'SELECT * FROM comment LEFT JOIN userInfo ON userInfo.userKey=comment.commentUserKey where commentReviewKey=?',
		[rn],
		function (err, rows) {
			console.log(rows);
			if (err) throw err; //실패시 에러
			else {//성공시
				res.send(rows);//응답
			}
		}
	);
});
//댓글 삭제
app.post('/api/deleteComment', cors(), async (req, res) => {
	var commentNum = req.body.commentNum;
	var uid = req.body.userID;
	var ren = req.body.rn; //댓글 정보 불러오는 쿼리문
	var query = "SELECT * FROM comment where commentNumber='" + commentNum + "';";
	db.query(query, function (err, rows) {
		if (rows[0].commentUserKey == uid) { //작성자가 일치한다면 삭제
			db.query('delete from comment where commentNumber=?', [commentNum], function (
				err,
				result
			) {
				if (err) {
					res.sendStatus(403);
				} else {
					db.query( //댓글 리스트 출력
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
		} else { //작성가 불일치 시 에러
			res.sendStatus(403);
		}
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});