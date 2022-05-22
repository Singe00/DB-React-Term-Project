import React from 'react';
import {Link} from "react-router-dom"

export default function EmptyPage() {
	
	return (
		<div>
			<h1>404 Not Found</h1>
			<h2>잘못된 접근입니다.</h2>
			<Link to="/">첫 화면으로 돌아가기</Link>
		</div>
		
		
	);
}