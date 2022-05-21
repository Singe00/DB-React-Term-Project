import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainList } from './List';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router';
import axios from 'axios';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		'& .MuiDrawer-paper': {
			position: 'relative',
			whiteSpace: 'nowrap',
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
			boxSizing: 'border-box',
			...(!open && {
				overflowX: 'hidden',
				transition: theme.transitions.create('width', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
				width: theme.spacing(7),
				[theme.breakpoints.up('sm')]: {
					width: theme.spacing(9),
				},
			}),
		},
	})
);

const mdTheme = createTheme();

function Review() {
	const location = useLocation();
	const pid = location.state.id;
	const [show, setShow] = useState(true);
	const [users, setUsers] = useState([]);
	const [open, setOpen] = React.useState(true);
	const toggleDrawer = () => {
		setOpen(!open);
	};

	const onhandlePost = async (data) => {
		const { id } = data;
		const postData = { id };

		// post
		await axios
			.post('/api/review', postData)
			.then(function (response) {
				console.log(response.data, '성공');
				setUsers(response.data);
			})
			.catch(function (err) {
				console.log(err);
			});
	};

	console.log('eghiwhgiohwiogh[]');
	console.log(pid);

	if (show) {
		setShow(false);
		const joinData = {
			id: pid,
		};
		const { id } = joinData;

		onhandlePost(joinData);
	}

	const ShowReview = () => {
		return (
		<>
			<Table>
				<TableHead>
					<tr>
						<TableCell>번호</TableCell>
						<TableCell>게임 이름</TableCell>
						<TableCell>리뷰 내용</TableCell>
					</tr>
				</TableHead>
				<TableBody>
					{users.map((info) => (
						<tr key={info.id}>
							<TableCell>{info.reviewNumber}</TableCell>
							<TableCell>{info.reviewTitle}</TableCell>
							<TableCell>{info.reviewDetail}</TableCell>
						</tr>
					))}
				</TableBody>
			</Table>
		</>
		);
	};

	return (
		<ThemeProvider theme={mdTheme}>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position="absolute" open={open}>
					<Toolbar
						sx={{
							pr: '24px', // keep right padding when drawer closed
						}}
					>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={toggleDrawer}
							sx={{
								marginRight: '36px',
								...(open && { display: 'none' }),
							}}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
							sx={{ flexGrow: 1 }}
						>
							Dashboard
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer variant="permanent" open={open}>
					<Toolbar
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
							px: [1],
						}}
					>
						<IconButton onClick={toggleDrawer}>
							<ChevronLeftIcon />
						</IconButton>
					</Toolbar>
					<Divider />
					<List component="nav">{mainList}</List>
				</Drawer>
				<Box
					component="main"
					sx={{
						backgroundColor: (theme) =>
							theme.palette.mode === 'light'
								? theme.palette.grey[100]
								: theme.palette.grey[900],
						flexGrow: 1,
						height: '100vh',
						overflow: 'auto',
					}}
				>
					<Toolbar />
					<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
						<Grid container spacing={3}>
							{/* Recent Orders */}
							<Grid item xs={12}>
								<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
									<ShowReview />
								</Paper>
							</Grid>
						</Grid>
						<Copyright sx={{ pt: 4 }} />
					</Container>
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default function Dashboard() {
	return <Review />;
}