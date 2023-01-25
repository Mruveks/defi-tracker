import React from 'react'
import { Route, Routes } from 'react-router'

import './App.css'

import Home from './pages/Home'
import Stables from './pages/Stables'
import Yields from './pages/Yields'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stables" element={<Stables />} />
        <Route path="/yields" element={<Yields />} />
      </Routes>
</>
  )
}

export default App
