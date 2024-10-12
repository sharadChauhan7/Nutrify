import React from 'react';
// import Logo from '../assets/Logo.svg';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/User/user';
import { useNavigate } from 'react-router-dom';
// js-cookie
import Cookies from 'js-cookie';
import {
  AssessmentOutlined as DashboardIcon,
  Create as TestsIcon,
  DescriptionOutlined as ProblemsIcon,
  OndemandVideoOutlined as CoursesIcon,
  EmojiEventsOutlined as LeaderboardIcon,
  PlayCircleFilledWhiteOutlined as PlaygroundIcon
} from '@mui/icons-material';


const Sidebar = () => {
  let user = Cookies.get('user');
  user = JSON.parse(user);
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
    // { path: '/playground', icon: <PlaygroundIcon />, label: 'Playground' },
    { path: '/profile', icon: <TestsIcon />, label: 'Profile' },
    { path: '/dite', icon: <ProblemsIcon />, label: 'Diet Plan' },
    { path: `/meals/${user._id}`, icon: <CoursesIcon />, label: 'Meals' },
    // { path: '/courses', icon: <CoursesIcon />, label: 'Courses' },
    // { path: '/leaderboard', icon: <LeaderboardIcon />, label: 'Leaderboard' },
  ];
  let dispatch = useDispatch();
  const location = useLocation();

  const getLinkClasses = (path) => {
    const baseClasses = 'flex justify-start w-3/6 text-lg font-normal text-black hover:text-[#C967F5]';
    const activeClasses = ' text-[#c967f5]';
    return location.pathname == path ? `${baseClasses} ${activeClasses}` : baseClasses;
  };

  return (
    <nav className='border-2  h-screen w-1/5'>
      {/* Header */}
      <div className='py-10 bg-transparent'>
        <NavLink to='/' className='flex justify-center items-center'>
          {/* <img src={Logo} alt="Logo" /> */}
          <p className='text-[#C967F5] text-3xl flex gap-2 font-semibold'>
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
        <button className='flex justify-start w-3/6 text-lg font-normal text-black hover:text-[#C967F5]' onClick={() => {
          dispatch(logout());
          navigate('/auth');
        }}>
          <span className='mr-4'>{navItems[0].icon}</span>
          <span>Logout</span></button>
    </div>
    </nav >
  );
}

export default Sidebar;
