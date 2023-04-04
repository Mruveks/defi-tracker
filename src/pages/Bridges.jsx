import React from 'react'
import { Helmet } from 'react-helmet'
import BridgesRanking from '../components/BridgesRanking'

const Bridges = () => {
  return (
    <div className="grid grid-cols-1 w-full text-md" >

      <Helmet>
        <title>Bridges | DeFi</title>
        <meta name="description" content="Find the best DeFi bridges with our comprehensive ranking system."/>
      </Helmet>

      <header className="text-center  pt-10 mb-5 text-4xl italic">
        Top Bridges
      </header>


      <BridgesRanking />
    </div>
  )
}

export default Bridges
