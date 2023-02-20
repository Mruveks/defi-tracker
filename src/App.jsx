import React from 'react'
import { Route, Routes } from 'react-router'

import './App.css'

import Navbar from './components/Navbar'

import { Home, Stables, Yields, Bridges, Avax, Ethereum, Polygon, Arbitrum, Optimism, Bsc, Solana, Kava, Tron, Algorand, Fantom, Lending, CEX, DEX } from './pages/index'
import ProtocolObject from './pages/protocols/ProtocolObject'

function App() {

  return (
    <div className="w-full overflow-hidden pl-48 pt-8">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stables" element={<Stables />} />
        <Route path="/yields" element={<Yields />} />
        <Route path="/bridges" element={<Bridges />} />
        <Route path="/lending" element={<Lending />} />
        <Route path="/cex" element={<CEX />} />
        <Route path="/dex" element={<DEX />} />

        <Route path="/protocols" element={<ProtocolObject />} />

        <Route path="/ethereum" element={<Ethereum />} />
        <Route path="/bsc" element={<Bsc />} />
        <Route path="/avalanche" element={<Avax />} />
        <Route path="/polygon" element={<Polygon />} />
        <Route path="/arbitrum" element={<Arbitrum />} />
        <Route path="/optimism" element={<Optimism />} />
        <Route path="/solana" element={<Solana />} />
        <Route path="/kava" element={<Kava />} />
        <Route path="/tron" element={<Tron />} />
        <Route path="/algorand" element={<Algorand />} />
        <Route path="/fantom" element={<Fantom />} />
      </Routes>
    </div>
  )
}

export default App
