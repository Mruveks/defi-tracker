import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'

import './App.css'

import Navbar from './components/Navbar'
import ChainPage from './pages/chains/ChainPage'
import { Home, Stables, Yields, Bridges, Lending, CEX, DEX } from './pages/index'
import ScrollTopButton from './components/ScrollTopButton'

const ProtocolPage = lazy(() => import('./pages/protocols/ProtocolPage'));


function App() {

  return (
    <div className="w-full pl-0 mt-20 sm:mt-0 md:pl-48 pt-8">
      <Navbar />
      <ScrollTopButton />
      <Suspense fallback={<div>Loading...</div>} >
        <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/stables" element={<Stables />} />
        <Route path="/yields" element={<Yields />} />
        <Route path="/bridges" element={<Bridges />} />
        <Route path="/lending" element={<Lending />} />
        <Route path="/cex" element={<CEX />} />
        <Route path="/dex" element={<DEX />} />
        <Route key="/protocol/:protocolId" path="/protocol/:protocolId" element={<ProtocolPage />} />
        <Route key="/chain/:chainId" path="/chain/:chainId" element={<ChainPage />} />
        
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
