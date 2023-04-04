import React from 'react'
import { Helmet } from 'react-helmet'
import RankingObject from '../components/RankingObject'

const CEX = () => {
  return (
    <div className="grid grid-cols-1 w-full text-md">

      <Helmet>
        <title>CEX | DeFi</title>
        <meta name="description" content="Find the best centralized exchanges"/>
      </Helmet>

      <header className="text-center  pt-10 mb-5 text-4xl italic">
        Top Centralised Exchanges
      </header>

      <RankingObject chain='CEX' />

    </div>
  )
}

export default CEX
