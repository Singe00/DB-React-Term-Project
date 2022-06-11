//20181131 조시완
import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { useNavigate } from 'react-router-dom';

//리뷰 상세보기 태그
export default function ReviewDetailShow() {
	const navigate = useNavigate();
	const location = useLocation();
	const pid = location.state.id;
	const [users, setUsers] = useState([]);
	const [textValue, setTextValue] = useState('');
	const handleSetValue = (e) => {
		setTextValue(e.target.value);
	};
	//이벤트 처리
	const onhandlePost = async (data) => {
		const { id } = data;
		const postData = { id };

		// post
		await axios
			.post('/api/showreview', postData) //해당하는 리뷰의 상세보기 불러오기
			.then(function (response) { //성공
				setUsers(response.data); 
			})
			.catch(function (err) {//실패
			});
	};
	//리뷰 수정
	const editReview = async (params) => {
		const joinData = {//데이터 처리
			reviewNum: params,
			userID: sessionStorage.getItem('userKey'),
		};
		// post
		await axios
			.post('/api/editReview', joinData)//리뷰 작성자 확인
			.then(function (response) { //일치한다면
				navigate('/EditPage',{ state: response.data });//수정페이지로 이동
			})
			.catch(function (err) { //불일치면
				alert('본인이 작성한 리뷰만 수정할 수 있습니다!'); //에러 알림
			});
	};
	//리뷰 삭제
	const deleteReview = async (params) => {
		const joinData = {//데이터 처리
			reviewNum: params,
			userID: sessionStorage.getItem('userKey'),
		};
		// post
		await axios
			.post('/api/deleteReview', joinData)//리뷰 작성자 확인
			.then(function (response) {//일치한다면
				alert('삭제가 완료되었습니다!');//삭제
				navigate('/Main');//메인화면으로 이동
			})
			.catch(function (err) {//불일치라면
				alert('본인이 작성한 리뷰만 삭제할 수 있습니다!'); //삭제 불가 알림
			});
	};
	//페이지 처음 접속 시 댓글 리스트 정보 불어와서 출력
		useEffect(() => {
		const joinData = {
			id: pid,
		};

		onhandlePost(joinData);
	}, []);

	return (
		<div>
			<Table>
				<TableHead>
					<tr>
						<TableCell>로고</TableCell>
						<TableCell>작성자</TableCell>
						<TableCell>제목</TableCell>
						<TableCell>별점</TableCell>
						<TableCell>기타</TableCell>
						<TableCell></TableCell>
					</tr>
				</TableHead>
				<TableBody>
					{users.map((info) => (
						<tr key={info.reviewNumber}>
							<TableCell>
								<img
									src={require(`./images/${info.filename}`)}
									width="50"
									height="50"
								/>
							</TableCell>
							<TableCell>{info.userName}</TableCell>
							<TableCell>{info.reviewTitle}</TableCell>
							<TableCell>
								<img
									src={require(`./images/star${info.reviewScore}` + `.png`)}
									width="150"
									height="50"
								/>
							</TableCell>
							<TableCell>
								<button onClick={() => editReview(`${info.reviewNumber}`)}>
									수정
								</button>
							</TableCell>
							<TableCell>
								<button onClick={() => deleteReview(`${info.reviewNumber}`)}>
									삭제
								</button>
							</TableCell>
						</tr>
					))}
				</TableBody>
			</Table>
			<br></br>
			{users.map((info) => (
				<div key={info.reviewNumber}>
					<textarea
						disabled
						maxLength="500"
						value={info.reviewDetail}
						onChange={(e) => handleSetValue(e)}
						className="CReviewText"
					></textarea>
				</div>
			))}
		</div>
	);
}