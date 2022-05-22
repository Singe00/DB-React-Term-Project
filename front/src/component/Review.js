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
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainList } from './List';
import { useLocation } from 'react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { Link } from 'react-router-dom';

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
	const [users, setUsers] = useState([]);
	const [open, setOpen] = React.useState(true);
	const toggleDrawer = () => {
		setOpen(!open);
	};
	
	const setRN = (params) => {
		sessionStorage.setItem("rn",params)
	};

	const onhandlePost = async (data) => {
		const { id } = data;
		const postData = { id };

		// post
		await axios
			.post('/api/review', postData)
			.then(function (response) {
				setUsers(response.data);
			})
			.catch(function (err) {});
	};

	useEffect(() => {
		const joinData = {
			id: pid,
		};

		onhandlePost(joinData);
	}, []);

	const ShowReview = () => {
		return (
			<>
				<Table>
					<TableHead>
						<tr>
							<TableCell>로고</TableCell>
							<TableCell>작성자</TableCell>
							<TableCell>제목</TableCell>
							<TableCell>별점</TableCell>
							<TableCell>리뷰내용</TableCell>
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
									<Link
										to={`/ReviewDetail/${info.reviewNumber}`}
										state={{ id: info.reviewNumber }}
									onClick={() => setRN(`${info.reviewNumber}`)}>
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
							Game Review
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
					</Container>
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default function Dashboard() {
	return <Review />;
}