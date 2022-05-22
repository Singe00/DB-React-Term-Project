import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import axios from 'axios';

const ShowComment = ({ users, getData }) => {
	const deleteComment = async (params) => {
		const joinData = {
			commentNum: params,
			userID: sessionStorage.getItem('userKey'),
			rn: sessionStorage.getItem('rn'),
		};
		// post
		await axios
			.post('/api/deleteComment', joinData)
			.then(function (response) {
				getData(response.data);
				alert('삭제가 완료되었습니다!');
			})
			.catch(function (err) {
				alert('본인이 작성한 댓글만 삭제할 수 있습니다!');
			});
	};

	return (
		<>
			<Table>
				<TableHead>
					<tr>
						<TableCell>작성자</TableCell>
						<TableCell>내용</TableCell>
						<TableCell>기타</TableCell>
						<TableCell></TableCell>
					</tr>
				</TableHead>
				<TableBody>
					{users.map((info) => (
						<tr key={info.commentNumber}>
							<TableCell>{info.userName}</TableCell>
							<TableCell>{info.commentDetail}</TableCell>
							<TableCell>
								<button onClick={() => deleteComment(`${info.commentNumber}`)}>
									삭제
								</button>
							</TableCell>
						</tr>
					))}
				</TableBody>
			</Table>
		</>
	);
};

export default React.memo(ShowComment);