import React from 'react'
import { Route, Routes } from 'react-router'

import './App.css'

import Navbar from './components/Navbar'

import { Home, Stables, Yields, Fees, Bridges, Avax, Ethereum } from './pages/index'
import Search from './utilities/Search'

function App() {

  return (
    <div className="w-full overflow-hidden pl-48 pt-8">
      <Navbar />
      <div className="text-center text-white pt-10 pb-5 text-4xl">
        Cross Chain Defi Platform
      </div>

      <Routes>
        <Route path="/defi" element={<Home />} />
        <Route path="/stables" element={<Stables />} />
        <Route path="/yields" element={<Yields />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/bridges" element={<Bridges />} />
        <Route path="/avalanche" element={<Avax />} />
        <Route path="/ethereum" element={<Ethereum />} />
      </Routes>
    </div>
  )
}

export default App
