import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { Link } from 'react-router-dom';

const GameList = ({ users }) => {
	return (
		<>
			<Table>
				<TableHead>
					<tr>
						<TableCell>번호</TableCell>
						<TableCell>로고</TableCell>
						<TableCell>게임 이름</TableCell>
						<TableCell>장르</TableCell>
						<TableCell>제작사</TableCell>
						<TableCell>리뷰링크</TableCell>
					</tr>
				</TableHead>
				<TableBody>
					{users.map((info) => (
						<tr key={info.id}>
							<TableCell>{info.id}</TableCell>
							<TableCell>{<img src={ require(`./images/${info.filename}`) } width="50" height="50"/>}</TableCell>
							<TableCell>{info.gname}</TableCell>
							<TableCell>{info.genre}</TableCell>
							<TableCell>{info.make}</TableCell>
							<TableCell>
								<Link to={`/Review/${info.id}`} state={{ id: info.id }}>
									이동
								</Link>
							</TableCell>
						</tr>
					))}
				</TableBody>
			</Table>
		</>
	);
};

export default GameList;