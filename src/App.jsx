import React from 'react'
import { Route, Routes } from 'react-router'

import './App.css'

import Navbar from './components/Navbar'

import { Home, Stables, Yields, Fees, Bridges, Avax, Ethereum, Polygon, Arbitrum, Optimism, Bsc, Solana } from './pages/index'

function App() {

  return (
    <div className="w-full overflow-hidden pl-48 pt-8">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stables" element={<Stables />} />
        <Route path="/yields" element={<Yields />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/bridges" element={<Bridges />} />

        <Route path="/ethereum" element={<Ethereum />} />
        <Route path="/bsc" element={<Bsc />} />
        <Route path="/avalanche" element={<Avax />} />
        <Route path="/polygon" element={<Polygon />} />
        <Route path="/arbitrum" element={<Arbitrum />} />
        <Route path="/optimism" element={<Optimism />} />
        <Route path="/solana" element={<Solana />} />
      </Routes>
    </div>
  )
}

export default App
