import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { useNavigate } from 'react-router-dom';

export default function ReviewDetailShow() {
	const navigate = useNavigate();
	const location = useLocation();
	const pid = location.state.id;
	const [users, setUsers] = useState([]);
	const [textValue, setTextValue] = useState('');
	const handleSetValue = (e) => {
		setTextValue(e.target.value);
	};
	const onhandlePost = async (data) => {
		const { id } = data;
		const postData = { id };

		// post
		await axios
			.post('/api/showreview', postData)
			.then(function (response) {
				setUsers(response.data);
			})
			.catch(function (err) {
			});
	};

	const editReview = async (params) => {
		const joinData = {
			reviewNum: params,
			userID: sessionStorage.getItem('userKey'),
		};
		// post
		await axios
			.post('/api/editReview', joinData)
			.then(function (response) {
				navigate('/EditPage',{ state: response.data });
			})
			.catch(function (err) {
				alert('본인이 작성한 리뷰만 수정할 수 있습니다!');
			});
	};

	const deleteReview = async (params) => {
		const joinData = {
			reviewNum: params,
			userID: sessionStorage.getItem('userKey'),
		};
		// post
		await axios
			.post('/api/deleteReview', joinData)
			.then(function (response) {
				alert('삭제가 완료되었습니다!');
				navigate('/Main');
			})
			.catch(function (err) {
				alert('본인이 작성한 리뷰만 삭제할 수 있습니다!');
			});
	};
	
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