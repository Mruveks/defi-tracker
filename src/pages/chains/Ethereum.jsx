import React from 'react'
import { Helmet } from 'react-helmet';

import ChartObject from '../../components/charts/ChartObject'
import RankingObject from '../../components/RankingObject'
import SearchList from '../../components/SearchList'

const Ethereum = () => {

  return (

    <div className="grid grid-cols-1 w-full text-md">
      
      <Helmet>
        <title>Ethereum | DeFi</title>
        <meta name="description" content="Ethereum"/>
      </Helmet>

      <div className="mt-10 mx-10">
        <SearchList/>
      </div>

      <div className="text-center text-white pt-10 mb-5 text-4xl italic">
        Ethereum
      </div>
      
      <div className="h-max my-5 mx-10 text-white">
        <ChartObject chain='Ethereum' />
      </div>
      
      <header className="flex justify-center w-full mt-5 text-white text-3xl">Top protocols from <h1 className="italic px-2"> Ethereum </h1> ecosystem</header>
      <RankingObject chain='Ethereum' />

    </div>
  )
}

export default Ethereum
