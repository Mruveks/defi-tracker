import React from 'react'
import { Route, Routes } from 'react-router'

import './App.css'

import Navbar from './components/Navbar'

import { Home, Stables, Yields, Fees, Bridges, Avax, Ethereum, Polygon, Arbitrum } from './pages/index'

function App() {

  return (
    <div className="w-full overflow-hidden pl-48 pt-8">
      <Navbar />

      <Routes>
        <Route path="/defi" element={<Home />} />
        <Route path="/stables" element={<Stables />} />
        <Route path="/yields" element={<Yields />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/bridges" element={<Bridges />} />

        <Route path="/avalanche" element={<Avax />} />
        <Route path="/ethereum" element={<Ethereum />} />
        <Route path="/polygon" element={<Polygon />} />
        <Route path="/arbitrum" element={<Arbitrum />} />
      </Routes>
    </div>
  )
}

export default App
