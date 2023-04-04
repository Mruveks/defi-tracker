import React from 'react'
import YieldsRanking from '../components/YieldsRanking'
import { Helmet } from 'react-helmet'
const Yields = () => {
  return (
    <div className="grid grid-cols-1 w-full text-md" >

      <Helmet>
        <title>Yields | DeFi</title>
        <meta name="description" content="Discover the highest-yielding decentralized finance (DeFi) projects"/>
      </Helmet>
      
      <header className="text-center  pt-10 mb-10 text-4xl italic">
        Yields Ranking
      </header>
      <YieldsRanking />
    </div>
  )
}

export default Yields
