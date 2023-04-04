import React from 'react'
import { Helmet } from 'react-helmet'

import TVLranking from '../components/TVLranking'
import TVLchart from '../components/charts/TVLchart'
import SearchList from '../components/SearchList'

const Home = () => {
  return (
    <div className="grid grid-cols-1 w-full text-md">

      <Helmet>
        <title>Home | DeFi</title>
        <meta name="description" content="Discover the best decentralized finance (DeFi) protocols"/>
      </Helmet>

      <header className="text-center pt-10 mb-5 text-4xl italic">
        Top DeFi Protocols
      </header>

      <div className="mx-10">
        <SearchList/>
      </div>
 
      <div className="h-max my-5 mx-10 text-white">
        <TVLchart />
      </div>
      
      <header className="flex justify-center w-full mb-5 text-white text-4xl italic">Ranking</header>

      <TVLranking />
    </div>
  )
}

export default Home
