//20181131 조시완

import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//템플릿
function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

//랜덤 이미지 출력을 위한 난수
var randomNumber = Math.floor(Math.random() * 13);
const theme = createTheme();

//Login 태그
export default function Login() {
	
	//랜덤으로 출력될 이미지 리스트
	const imageUrl = [
		{
			imgUrl: 'url(https://images.alphacoders.com/472/thumb-1920-472498.jpg)',
		},
		{
			imgUrl: 'url(https://images5.alphacoders.com/394/thumb-1920-394511.jpg)',
		},
		{
			imgUrl: 'url(https://wallpapercave.com/wp/wp168608.jpg)',
		},
		{
			imgUrl: 'url(https://wallpaperaccess.com/full/5609914.jpg)',
		},
		{
			imgUrl: 'url(https://wallpaperaccess.com/full/2522176.jpg)',
		},
		{
			imgUrl: 'url(https://images6.alphacoders.com/992/thumb-1920-992033.jpg)',
		},
		{
			imgUrl: 'url(https://images7.alphacoders.com/521/thumb-1920-521305.png)',
		},
		{
			imgUrl: 'url(https://wallpaperaccess.com/full/6826187.png)',
		},
		{
			imgUrl: 'url(https://images3.alphacoders.com/816/thumb-1920-816720.jpg)',
		},
		{
			imgUrl: 'url(https://images4.alphacoders.com/553/thumb-1920-553496.jpg)',
		},
		{
			imgUrl: 'url(https://images2.alphacoders.com/600/thumb-1920-600255.jpg)',
		},
		{
			imgUrl: 'url(https://images3.alphacoders.com/785/thumb-1920-785576.png)',
		},
		{
			imgUrl:
				'url(https://7wallpapers.net/wp-content/uploads/6_StarCraft-2-Legacy-of-the-Void.jpg)',
		},
	];
	//네비게이션
	const navigate = useNavigate();
	//로그인 api
	const onhandlePost = async (data) => {
		const { ID, password } = data;
		const postData = { ID, password };

		// post로 입력한 로그인 폼 전달
		await axios
			.post('/api/login', postData)
			.then(function (response) {
				sessionStorage.setItem('userKey',response.data[0].userKey) //로그인 성공 시 유저 정보 저장
				navigate('/Main'); //메인화면으로 이동
			})
			.catch(function (err) {
				alert('아이디, 비밀번호를 확인해주세요'); //
			});
	};
	//로그인 버튼 이벤트
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		//폼의 값을
		const joinData = {
			ID: data.get('id'),
			password: data.get('password'),
		};
		//아래 함수로 전달
		onhandlePost(joinData);
	};
	//mui 템플릿
	return (
		<ThemeProvider theme={theme}>
			<Grid container component="main" sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid
					sm={4}
					md={7}
					sx={{
						backgroundImage: imageUrl[randomNumber].imgUrl,
						backgroundRepeat: 'no-repeat',
						backgroundColor: (t) =>
							t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
				<Grid sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign in
						</Typography>
						<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="id"
								label="ID"
								name="id"
								autoComplete="id"
								autoFocus
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Sign In
							</Button>
							<Grid container>
								<Grid item>
									<Link href="/Register" variant="body2">
										{'계정이 없으신가요?? 회원가입하기'}
									</Link>
								</Grid>
							</Grid>
							<Copyright sx={{ mt: 5 }} />
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}