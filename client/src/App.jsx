import {React,useEffect,useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/navbar.jsx'
import { useParams,useLocation } from 'react-router-dom'
import Privateroute from './components/auth/privateroute.jsx'
import Form from './pages/UserForm.jsx'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import Profile from './pages/Profile.jsx'
import Meals from './pages/Meals.jsx'
import Dite from './pages/Diet.jsx'
import { useSelector } from 'react-redux'
import SideMenu from './components/shared/SideMenu.jsx'
import Review from './pages/Review.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Connector from './components/shared/Connector.jsx'
import Notfound from './pages/Notfound.jsx'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { initializeUserState } from './features/User/user.js'

// Get user id rom url using useParams

function App() {
  const [loading, setLoading] = useState(true);
  const {isLogin} = useSelector((state)=>state.userInfo);
  const dispatch = useDispatch();
  console.log(isLogin);
  // const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    async function checkAuth() {
      try {
        setLoading(true);
        await axios.get(import.meta.env.VITE_SERVER_URL, { withCredentials: true });
        setLoading(false);
        toast.success('Connected to server');
      } catch (error) {
        console.error('Error connecting to server:', error.response.data);
        toast.error(error.response.data);
      }
    }
    checkAuth();
  },[]);
  useEffect(() => {
    dispatch(initializeUserState());
  }, [dispatch]);

  return (
    <Router>
      {loading ? <Connector /> : <RoutesWithNavbar isLogin={isLogin} />}
    </Router>
  );
}
  function RoutesWithNavbar({isLogin}) {
    const location = useLocation();
    const noNavbarRoutes = ['/auth', '/register','/meals']; 
    const showNavbar = !noNavbarRoutes.includes(location.pathname);
    console.log(showNavbar);
  console.log(location);

  useEffect(() => {
    const routeTitles = {
      '/': 'Home',
      '/auth': 'Auth',
      '/profile': 'Profile',
      '/meals': 'Meals',
      '/diet': 'Diet Plan',
      '/review': 'Review',
      '/dashboard': 'Dashboard',
      // Add more routes and titles as needed
    };

    const currentTitle = routeTitles[location.pathname] || 'Healthy AI';
    document.title = currentTitle;
  }, [location]);
  return (
    <>
    <div className='flex overflow-auto'>
    {showNavbar && <SideMenu />}
    <Routes>
          <Route path='/auth' element={<Privateroute user={!isLogin} path='/'>
            <Auth />
          </Privateroute>} />
          <Route element={<Privateroute user={isLogin}/>}>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/meals/:id' element={<Meals />} />
            <Route path='/diet' element={<Dite />} />
            <Route path='/review' element={<Review />} />

          </Route> 
          <Route element={<Privateroute user={!isLogin}/>}>
            <Route path='/register' element={<Form />} />
          </Route>
           {/*Page not found route  */}
          <Route path='*' element={<Notfound />} />
      </Routes>
    </div>

    </>
  )
}

export default App

