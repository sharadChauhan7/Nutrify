import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/navbar.jsx'
// Laxy load the home page
const Home = React.lazy(() => import('./pages/home.jsx'));
const Propertyform = React.lazy(()=>import('./pages/propertyform.jsx'));
function App() {
  return (
    <>
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addproperty" element={<Propertyform />} />
          </Routes>
        </React.Suspense>
      </Router>
    </>
  )
}

export default App
