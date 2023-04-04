import React from 'react'
import { Helmet } from 'react-helmet'

import RankingObject from '../components/RankingObject'

const Lending = () => {
  return (
    <div className="grid grid-cols-1 w-full text-md">

      <Helmet>
        <title>Lending | DeFi</title>
        <meta name="description" content="Find the best decentralized finance (DeFi) lending projects"/>
      </Helmet>

      <header className="text-center  pt-10 mb-5 text-4xl italic">
        Top Lending Protocols
      </header>

      <RankingObject chain='Lending' />

    </div>
  )
}

export default Lending
