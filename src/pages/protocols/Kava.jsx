import React from 'react'
import { Helmet } from 'react-helmet';

import ChartObject from '../../components/charts/ChartObject'
import RankingObject from '../../components/RankingObject';
import SearchList from '../../components/SearchList'

const Kava = () => {

  return (

    <div className="grid grid-cols-1 w-full text-md">
      
      <Helmet>
        <title>Kava | DeFi</title>
        <meta name="description" content="Kava"/>
      </Helmet>

      <div className="mt-10 mx-10">
        <SearchList/>
      </div>

      <div className="text-center text-white pt-10 mb-5 text-4xl italic">
      Kava
      </div>
      
      <div className="h-max my-5 mx-10 text-white">
        <ChartObject chain='Kava' />
      </div>
      
      <header className="flex justify-center w-full mt-5 text-white text-3xl">Top protocols from <h1 className="italic px-2"> Kava </h1> ecosystem</header>
      <RankingObject chain='Kava' />

    </div>
  )
}

export default Kava
