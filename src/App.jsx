import React from 'react'
import Home from './pages/Home.jsx'
import { Route, Routes } from 'react-router'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import LandingPage from './pages/Landingpage.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route index element={<LandingPage />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
      </Routes>
    </div>
  )
}



export default App