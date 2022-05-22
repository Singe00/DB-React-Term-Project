import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useState } from 'react';
import './Orders.css';
import axios from 'axios';
import GameList from './GameList';

export default function Orders() {
  const [Selected, setSelected] = useState("1");
  const [users, setUsers] = useState([]);
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

	
  const onhandlePost = async (data) => {
    const { opt, search } = data;
    const postData = { opt, search };

    // post
    await axios
      .post('/api/info', postData)
      .then(function (response) {
		setUsers(response.data);
      })
      .catch(function (err) {
      });
  };
	
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
	 
	const joinData = {
      opt: data.get('opt'),
      search: data.get('search'),
    };
    const { opt, search } = joinData;

	onhandlePost(joinData);

  };
	
  return (
        <div>
            <form onSubmit={handleSubmit}>
			  <select className="optSearch" onChange={handleSelect} value={Selected} id='opt' name='opt'>
				  <option value="1">이름</option>
				  <option value="2">장르</option>
				  <option value="3">제작사</option>
			  </select>
              <input type='text' maxLength='20' list="searchName" className='search_input' id='search' name='search' placeholder='검색어를 입력해주세요.'/>
				<datalist id="searchName">
                <option value="메이플 스토리"></option>
                <option value="던전 앤 파이터"></option>
                <option value="서든어택"></option>
                <option value="사이퍼즈"></option>
				<option value="카트라이더"></option>
				<option value="세븐나이츠"></option>
				<option value="리니지2 레볼루션"></option>
				<option value="리니지"></option>
				<option value="블레이드&소울"></option>
				<option value="스타크래프트"></option>
				<option value="오버워치"></option>
				<option value="하스스톤"></option>
				<option value="월드 오브 워크래프트"></option>
				<option value="타이탄폴"></option>
				<option value="APEX 레전드"></option>
				<option value="젤다의 전설"></option>
				<option value="별의 커비"></option>
				<option value="포켓몬스터"></option>
				<option value="동물의 숲"></option>
				<option value="헤일로"></option>
				<option value="카운터 스트라이크"></option>
				<option value="언차티드"></option>
				<option value="호라이즌 제로던"></option>
				<option value="갓 오브 워"></option>
				<option value="더 라스트 오브 어스"></option>
				<option value="디트로이트 비컴 휴먼"></option>
				<option value="데드 스페이스"></option>
				<option value="크라이시스3"></option>
				<option value="FIFA22"></option>
				<option value="배틀필드4"></option>
				<option value="레인보우 식스 시즈"></option>
				<option value="어쌔신 크리드"></option>
				<option value="포아너"></option>
				<option value="리스폰 엔터테인먼트"></option>
				<option value="닌텐도"></option>
				<option value="Xbox Game Studio"></option>
				<option value="Sony Interactive Entertainment"></option>
				<option value="Electronic Arts"></option>
				<option value="UBISOFT"></option>
				<option value="액션 어드벤쳐"></option>
				<option value="액션"></option>
				<option value="인터랙티브 무비"></option>
				<option value="Sport"></option>
				<option value="CCG"></option>
				<option value="TPS"></option>
				<option value="캐쥬얼"></option>
				<option value="배틀로얄"></option>
				<option value="FPS"></option>
            </datalist>
              <input type='submit' value='검색' className='serach_submit'/>
            </form>

		  <GameList users={users}/>
        </div>

  );
}