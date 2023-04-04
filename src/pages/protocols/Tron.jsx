import React from 'react'
import { Helmet } from 'react-helmet';
import ChartObject from '../../components/charts/ChartObject'
import RankingObject from '../../components/RankingObject';
import SearchList from '../../components/SearchList'

const Tron = () => {

  return (

    <div className="grid grid-cols-1 w-full text-md">
      
      <Helmet>
        <title>Tron | DeFi</title>
        <meta name="description" content="Tron"/>
      </Helmet>

      <div className="mt-10 mx-10">
        <SearchList/>
      </div>

      <div className="text-center text-white pt-10 mb-5 text-4xl italic">
      Tron
      </div>
      
      <div className="h-max my-5 mx-10 text-white">
        <ChartObject chain='Tron' />
      </div>
      
      <header className="flex justify-center w-full mt-5 text-white text-3xl">Top protocols from <h1 className="italic px-2"> Tron </h1> ecosystem</header>
      <RankingObject chain='Tron' />

    </div>
  )
}

export default Tron