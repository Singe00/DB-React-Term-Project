import * as React from 'react';
import Link from '@mui/material/Link';
import { useState } from 'react';
import axios from 'axios';
import './WriteReview.css';
import { useNavigate } from 'react-router-dom';

export default function WriteReview() {
	const [Selected, setSelected] = useState('1');
	const [Selected2, setSelected2] = useState('1');
	const [textValue, setTextValue] = useState('');
	const handleSelect = (e) => {
		setSelected(e.target.value);
	};

	const handleSelect2 = (e) => {
		setSelected2(e.target.value);
	};
	const handleSetValue = (e) => {
		setTextValue(e.target.value);
	};
	const navigate = useNavigate();

	const onhandlePost = async (data) => {
		const { opt, star, title, reviewtext, userID } = data;
		const postData = { opt, star, title, reviewtext, userID };

		// post
		await axios
			.post('/api/reviewtext', postData)
			.then(function (response) {
				alert('리뷰 작성이 완료되었습니다!');
				navigate('/Main');
			})
			.catch(function (err) {
				alert('이미 작성한 리뷰가 존재합니다.');
			});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const joinData = {
			opt: data.get('opt'),
			star: data.get('star'),
			title: data.get('title'),
			reviewtext: { textValue }.textValue,
			userID: sessionStorage.getItem('userKey'),
		};
		if (joinData.title !== '' && textValue !== '') {
			const { opt, star, title, reviewtext, userID } = joinData;
			onhandlePost(joinData);
		} else {
			alert('제목과 리뷰를 작성해주세요!');
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>게임 선택</label>
				<select
					className="optreview"
					onChange={handleSelect}
					value={Selected}
					id="opt"
					name="opt"
				>
					<option value="1">메이플 스토리</option>
					<option value="2">던전 앤 파이터</option>
					<option value="3">서든어택</option>
					<option value="4">사이퍼즈</option>
					<option value="5">카트라이더</option>
					<option value="6">세븐나이츠</option>
					<option value="7">리니지2 레볼루션</option>
					<option value="8">리니지</option>
					<option value="9">블레이드&소울</option>
					<option value="10">스타크래프트</option>
					<option value="11">오버워치</option>
					<option value="12">하스스톤</option>
					<option value="13">월드 오브 워크래프트</option>
					<option value="14">타이탄폴</option>
					<option value="15">APEX 레전드</option>
					<option value="16">젤다의 전설</option>
					<option value="17">별의 커비</option>
					<option value="18">포켓몬스터</option>
					<option value="19">동물의 숲</option>
					<option value="20">헤일로</option>
					<option value="21">카운터 스트라이크</option>
					<option value="22">언차티드</option>
					<option value="23">호라이즌 제로던</option>
					<option value="24">갓 오브 워</option>
					<option value="25">더 라스트 오브 어스</option>
					<option value="26">디트로이트 비컴 휴먼</option>
					<option value="27">데드 스페이스</option>
					<option value="28">크라이시스3</option>
					<option value="29">FIFA22</option>
					<option value="30">배틀필드4</option>
					<option value="31">레인보우 식스 시즈</option>
					<option value="32">어쌔신 크리드</option>
					<option value="33">포아너</option>
				</select>
				<label>제목</label>
				<input type="text" className="title" id="title" name="title" maxLength="50" />
				<label>별점</label>
				<select
					onChange={handleSelect2}
					value={Selected2}
					class="optreview2"
					id="star"
					name="star"
				>
					<option value="1">1점</option>
					<option value="2">2점</option>
					<option value="3">3점</option>
					<option value="4">4점</option>
					<option value="5">5점</option>
				</select>

				<input type="submit" value="등록" className="review_submit" />
				<br></br>
				<textarea
					maxLength="500"
					placeholder="내용을 입력해주세요. (최대 500자)"
					value={textValue}
					onChange={(e) => handleSetValue(e)}
					className="ReviewText"
				></textarea>
			</form>
		</div>
	);
}