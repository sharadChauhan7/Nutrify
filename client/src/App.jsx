import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Laxy load the home page
const Home = React.lazy(() => import('./pages/home.jsx'));
function App() {
  return (
    <>
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </React.Suspense>
      </Router>
    </>
  )
}

export default App
