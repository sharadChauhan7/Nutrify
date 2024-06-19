import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/navbar.jsx'
import { useParams } from 'react-router-dom';
// Laxy load the home page
const Home = React.lazy(() => import('./pages/home.jsx'));
// const Property = React.lazy(() => import('./pages/property.jsx'));
import Privateroute from './components/auth/privateroute.jsx'

const Auth = React.lazy(()=>import('./pages/Auth.jsx'));
function App() {
  let { id } = useParams();
  let islogin = true;
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/auth' element={<Privateroute user={!islogin} path='/'>
            <Auth />
          </Privateroute>} />
          <Route element={<Privateroute user={islogin}/>}>
            <Route path='/' element={<Home />} />
            <Route path='dashboard' element={<Home />} />
          </Route> 
        </Routes>
      </Router>
    </>
  )
}

export default App
