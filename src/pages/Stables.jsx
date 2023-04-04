import React, { useEffect, useState} from 'react'
import { Helmet } from 'react-helmet'

import StablesRanking from '../components/StablesRanking'
import StablesTVLchart from '../components/charts/StablesTVLchart'
import SearchList from '../components/SearchList'
const Stables = () => {

  return (
    <div className="grid grid-cols-1 w-full text-md" >

      <Helmet>
        <title>Stablecoins | DeFi</title>
        <meta name="description" content="Find the best stablecoins"/>
      </Helmet>

      <header className="text-center pt-10 mb-5 text-4xl italic">
        Top Stablecoins
      </header>

      <div className="mx-10">
        <SearchList/>
      </div>
     <div className="h-max my-5 mx-10 ">
        <StablesTVLchart />
      </div>
      <header className="text-center  pt-10 mb-10 text-4xl italic">Ranking</header>
      <StablesRanking />
    </div>
  )
}

export default Stables
