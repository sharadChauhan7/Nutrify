import React, { useEffect,useState } from 'react';
// import Logo from '../assets/Logo.svg';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/User/user';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/HLogo.png'

import axios from 'axios';
// js-cookie
import Cookies from 'js-cookie';
import {
  AssessmentOutlined as DashboardIcon,
  Create as TestsIcon,
  DescriptionOutlined as ProblemsIcon,
  OndemandVideoOutlined as CoursesIcon,
  EmojiEventsOutlined as LeaderboardIcon,
  PlayCircleFilledWhiteOutlined as PlaygroundIcon,
} from '@mui/icons-material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { use } from 'react';


const Sidebar = () => {
  const [user , setUser] = useState(null);
  useEffect(()=>{
    async function getUser(){
      try{
        let res = await axios.get(import.meta.env.VITE_SERVER_URL+'auth/isLogin',{ withCredentials: true });
        if(res.status==200){
          setUser(res.data.user);
        }
      }
      catch(err){
        console.log(err);
      }
    }
    getUser();
  },[]);
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: <DashboardIcon />, label: 'Home' },
    { path: '/dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
    // { path: '/playground', icon: <PlaygroundIcon />, label: 'Playground' },
    { path: '/profile', icon: <TestsIcon />, label: 'Profile' },
    { path: '/diet', icon: <ProblemsIcon />, label: 'Diet Plan' },
    { path: `/meals/${user?user._id:""}`, icon: <CoursesIcon />, label: 'Meals' },
    {path:'/review',icon:<FeedbackIcon />,label:'Review'}
    // { path: '/courses', icon: <CoursesIcon />, label: 'Courses' },
    // { path: '/leaderboard', icon: <LeaderboardIcon />, label: 'Leaderboard' },
  ];
  let dispatch = useDispatch();
  const location = useLocation();

  const getLinkClasses = (path) => {
    const baseClasses = 'flex justify-start w-3/6 text-lg font-normal text-black hover:text-primary';
    const activeClasses = ' text-primary';
    return location.pathname == path ? `${baseClasses} ${activeClasses}` : baseClasses;
  };

  const logoutUser = async () => {
    try{
      let res = await axios.get(import.meta.env.VITE_SERVER_URL+'auth/logout',{ withCredentials: true });
      console.log(res.data);
      dispatch(logout());
      navigate('/auth');
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <nav className='  h-screen w-1/5'>
      {/* Header */}
      <div className='py-10 bg-transparent'>
        <NavLink to='/' className='flex justify-center items-center'>
          {/* <img src={Logo} alt="Logo" /> */}
          <p className='text-primary text-3xl flex gap-2 font-semibold items-center'>
            {/* Add logo icon */}
            <img src={Logo} alt="" className=' size-16'/>
            Healthy <span className='text-black'>AI</span>
          </p>
        </NavLink>
      </div>
      {/* Navigation */}
      <div className='flex flex-col justify-center items-center gap-8'>
        {navItems.map(({ path, icon, label }) => {
          return <NavLink key={path} to={path} className={getLinkClasses(path)}>
            <span className='mr-4'>{icon}</span>
            <span>{label}</span>
          </NavLink>
        })}
        <button className='flex justify-start w-3/6 text-lg font-normal text-black hover:text-primary' onClick={logoutUser}>
          <span className='mr-4'>{navItems[0].icon}</span>
          <span>Logout</span></button>
    </div>
    </nav >
  );
}

export default Sidebar;
