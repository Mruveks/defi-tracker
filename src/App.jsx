import React from 'react'
import { Route, Routes } from 'react-router'

import './App.css'

import Navbar from './components/Navbar'

import { Home, Stables, Yields, Fees, Bridges } from './pages/index'
import Avax from './components/projects/Avax'

function App() {

  return (
    <div className="w-full overflow-hidden pl-48">
      <Navbar />
      <div className="text-center text-white  py-10 text-4xl">
        Cross Chain Defi Platform
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stables" element={<Stables />} />
        <Route path="/yields" element={<Yields />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/bridges" element={<Bridges />} />
        <Route path="/avax" element={<Avax protocol={`platypus-finance`}/>} />

      </Routes>
    </div>
  )
}

export default App
