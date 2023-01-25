import React from 'react'
import { Route, Routes } from 'react-router'

import './App.css'

import Navbar from './components/Navbar'

import { Home, Stables, Yields, Fees, Bridges } from './pages/index'

function App() {

  return (
    <div className="w-full overflow-hidden bg-gray-400 pl-48">
      <Navbar />
      <div className="text-center py-10 text-2xl">
        Cross Chain Defi Platform
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stables" element={<Stables />} />
        <Route path="/yields" element={<Yields />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/bridges" element={<Bridges />} />
      </Routes>
    </div>
  )
}

export default App
