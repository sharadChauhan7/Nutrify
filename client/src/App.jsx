import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/navbar.jsx'
import { useParams,useLocation } from 'react-router-dom';
// Laxy load the home page
// const Property = React.lazy(() => import('./pages/property.jsx'));
import Privateroute from './components/auth/privateroute.jsx'
import Form from './pages/Form.jsx'
const Home = React.lazy(() => import('./pages/Home.jsx'));
const Auth = React.lazy(()=>import('./pages/Auth.jsx'));
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
    let { id } = useParams();
    let islogin = true;
  return (
    <>
    {showNavbar && <Navbar />}
        <Routes>
          <Route path='/auth' element={<Privateroute user={!islogin} path='/'>
            <Auth />
          </Privateroute>} />
          <Route element={<Privateroute user={islogin}/>}>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Home />} />
            <Route path='/register' element={<Form />} />
          </Route> 
        </Routes>
    </>
  )
}

export default App
