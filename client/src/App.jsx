import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/navbar.jsx'
import { useParams,useLocation } from 'react-router-dom'
import Privateroute from './components/auth/privateroute.jsx'
import Form from './pages/UserForm.jsx'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import Profile from './pages/Profile.jsx'
import Meals from './pages/Meals.jsx'
import { useSelector } from 'react-redux'
import MedicineForm from './pages/MedicineForm.jsx'
// Get user id rom url using useParams

function App() {
  return (
    <Router>
      <RoutesWithNavbar />
    </Router>
  );
}
  function RoutesWithNavbar() {
    const location = useLocation();
    const noNavbarRoutes = ['/auth', '/register']; 
    const showNavbar = !noNavbarRoutes.includes(location.pathname);
    const {isLogin} = useSelector((state)=>state.userInfo);
  return (
    <>
    {showNavbar && <Navbar />}
    <Routes>
          <Route path='/auth' element={<Privateroute user={!isLogin} path='/'>
            <Auth />
          </Privateroute>} />
          <Route element={<Privateroute user={isLogin}/>}>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/setmedicine' element={<MedicineForm />} />
            <Route path='/meals/:id' element={<Meals />} />
          </Route> 
          <Route element={<Privateroute user={!isLogin}/>}>
            <Route path='/register' element={<Form />} />
          </Route> 

        </Routes>

    </>
  )
}

export default App

