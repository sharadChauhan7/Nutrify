import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/navbar.jsx'
import { useParams } from 'react-router-dom';
// Laxy load the home page
const Home = React.lazy(() => import('./pages/home.jsx'));
const Propertyform = React.lazy(()=>import('./pages/propertyform.jsx'));
const Property = React.lazy(()=>import('./pages/property.jsx'));
function App() {
  let {id}=useParams();
  return (
    <>
      <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addproperty" element={<Propertyform />} />
            <Route path={`/:id`} element={<Property/>} />
          </Routes>
      </Router>
    </>
  )
}

export default App
