import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import {
    AssessmentOutlined as DashboardIcon,
    Create as TestsIcon,
    DescriptionOutlined as ProblemsIcon,
    OndemandVideoOutlined as CoursesIcon,
    EmojiEventsOutlined as LeaderboardIcon,
    PlayCircleFilledWhiteOutlined as PlaygroundIcon,
} from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/User/user';

const drawerWidth = 240;
import {DrawerHeader,AppBar,Drawer} from '../../util/sidebarUtil.jsx'



export default function SideBar() {
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navItems = [
        { path: '/', icon: <HomeIcon />, label: 'Home' },
        { path: '/dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
        { path: '/profile', icon: <TestsIcon />, label: 'Profile' },
        { path: '/diet', icon: <ProblemsIcon />, label: 'Diet Plan' },
        { path: `/meals/${user ? user._id : ""}`, icon: <CoursesIcon />, label: 'Meals' },
        { path: '/review', icon: <FeedbackIcon />, label: 'Review' }
    ];

    const getLinkClasses = (path) => {
        const baseClasses = ' text-lg font-normal text-black hover:text-primary';
        const activeClasses = ' text-primary';
        return location.pathname == path ? `${baseClasses} ${activeClasses}` : baseClasses;
    };
    useEffect(() => {
        async function getUser() {
            try {
                let res = await axios.get(import.meta.env.VITE_SERVER_URL + 'auth/isLogin', { withCredentials: true });
                if (res.status == 200) {
                    setUser(res.data.user);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        getUser();
    }, []);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutUser = async () => {
        try {
            let res = await axios.get(import.meta.env.VITE_SERVER_URL + 'auth/logout', { withCredentials: true });
            console.log(res.data);
            dispatch(logout());
            navigate('/auth');
        }
        catch (err) {
            console.log(err);
        }
    }
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* <CssBaseline /> */}
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Nutrify
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List >
                    {navItems.map(({ path, icon, label }) => {
                        return (
                            <>
                                <NavLink key={path} to={path} className={getLinkClasses(path)}>
                                    <ListItem key={label} disablePadding sx={{ display: 'block', background: location.pathname == path ? 'rgb(0,0,0,0.1)' : '' }} >
                                        <ListItemButton
                                            sx={[{ minHeight: 48, px: 2.5, },
                                            open
                                                ? {
                                                    justifyContent: 'initial',
                                                }
                                                : {
                                                    justifyContent: 'center',
                                                },
                                            ]}
                                        >
                                            <ListItemIcon
                                                color="primary"
                                                sx={[
                                                    {
                                                        minWidth: 0,
                                                        justifyContent: 'center',
                                                        color: location.pathname == path ? '#ffd60a' : ''
                                                    },
                                                    open
                                                        ? {
                                                            mr: 3,
                                                        }
                                                        : {
                                                            mr: 'auto',
                                                        },
                                                ]}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={label}
                                                sx={[
                                                    open
                                                        ? {
                                                            opacity: 1,
                                                        }
                                                        : {
                                                            opacity: 0,
                                                        },
                                                ]}
                                            />
                                        </ListItemButton>
                                    </ListItem></NavLink>

                            </>)
                    })}
                    <ListItem key='Logout' disablePadding className=' text-3xl font-normal text-black hover:text-primary' sx={{ display: 'block' }} onClick={logoutUser}>
                        <ListItemButton
                            sx={[{ minHeight: 48, px: 2.5, },
                            open
                                ? {
                                    justifyContent: 'initial',
                                }
                                : {
                                    justifyContent: 'center',
                                },
                            ]}
                        >
                            <ListItemIcon
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: 'center',
                                    },
                                    open
                                        ? {
                                            mr: 3,
                                        }
                                        : {
                                            mr: 'auto',
                                        },
                                ]}
                            >
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary='Logout'
                                sx={[
                                    open
                                        ? {
                                            opacity: 1,
                                        }
                                        : {
                                            opacity: 0,
                                        },
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>

                </List>
            </Drawer>
            
        </Box>
    );
}
