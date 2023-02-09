import React from 'react'

import ChartObject from '../../components/charts/ChartObject'
import RankingObject from '../../components/RankingObject';

const Avax = () => {

  return (

    <div className="grid grid-cols-1 w-full">
      
      <div className="h-max my-5 mx-10 text-white">
        <ChartObject chain='Avalanche' />
      </div>
      
      <header className="flex justify-center w-full mb-5 text-white text-3xl italic">Protocols TVL Ranking</header>
      <RankingObject chain='Avalanche' />

    </div>
  )
}

export default Avax
