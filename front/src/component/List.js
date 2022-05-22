import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import HomeIcon from '@mui/icons-material/Home';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link } from 'react-router-dom';

function logout() {
	sessionStorage.removeItem("userKey")
	alert("로그아웃되었습니다!")
	return (
		0
	);
}

export const mainList = (
	<React.Fragment>
		<Link to="/Main">
			<ListItemButton>
				<ListItemIcon>
					<HomeIcon />
				</ListItemIcon>
				<ListItemText primary="Main Page" />
			</ListItemButton>
		</Link>
		
		<Link to="/Write">
			<ListItemButton>
				<ListItemIcon>
					<MenuBookIcon />
				</ListItemIcon>
				<ListItemText primary="Review" />
			</ListItemButton>
		</Link>

		<Link to="/" onClick={logout}>
			<ListItemButton>
				<ListItemIcon>
					<LockOpenIcon />
				</ListItemIcon>
				<ListItemText primary="Log Out" />
			</ListItemButton>
		</Link>
	</React.Fragment>
);