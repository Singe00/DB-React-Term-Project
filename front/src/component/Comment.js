import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Comment.css';
import ShowComment from './ShowComment';

const Comment = ({}) => {
	const [textValue, setTextValue] = useState('');
	const [users, setUsers] = useState([]);
	const getData = (cdata) => {
		setUsers(cdata);
	};
	const handleSetValue = (e) => {
		setTextValue(e.target.value);
	};

	const onhandlePost = async (data) => {
		const { commenttext, userID, rn } = data;
		const postData = { commenttext, userID, rn };

		// post
		await axios
			.post('/api/comment', postData)
			.then(function (response) {
				setUsers(response.data);
				setTextValue('');
				alert('댓글 작성이 완료되었습니다!');
			})
			.catch(function (err) {
				alert('오류가 발생했습니다!');
			});
	};

	const onhandlePost2 = async (data) => {
		const { userID, rn } = data;
		const postData = { userID, rn };

		// post
		await axios
			.post('/api/showcomment', postData)
			.then(function (response) {
				setUsers(response.data);
			})
			.catch(function (err) {
				alert('오류가 발생했습니다!');
			});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const joinData = {
			commenttext: { textValue }.textValue,
			userID: sessionStorage.getItem('userKey'),
			rn: sessionStorage.getItem('rn'),
		};
		if (textValue !== '') {
			onhandlePost(joinData);
		} else {
			alert('내용을 작성해주세요!');
		}
	};

	useEffect(() => {
		const joinData = {
			uid: sessionStorage.getItem('userKey'),
			rn: sessionStorage.getItem('rn'),
		};

		onhandlePost2(joinData);
	}, []);

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="textareas">
					<textarea
						maxLength="200"
						placeholder="내용을 입력해주세요. (최대 200자)"
						value={textValue}
						onChange={(e) => handleSetValue(e)}
						className="CommentText"
					></textarea>
				</div>
				<div className="textareas">
					<input type="submit" value="등록" className="comment_submit" />
				</div>
			</form>
			<ShowComment users={users} getData={getData} />
		</>
	);
};

export default Comment;