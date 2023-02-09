import React from 'react'

import ChartObject from '../../components/charts/ChartObject'
import RankingObject from '../../components/RankingObject'

const Optimism = () => {

  return (

    <div className="grid grid-cols-1 w-full">

      <div className="text-center text-white pt-10 mb-5 text-4xl italic">
        Optimism
      </div>
      
      <div className="h-max my-5 mx-10 text-white">
        <ChartObject chain='Optimism' />
      </div>
      
      <header className="flex justify-center w-full mt-5 text-white text-3xl">Top protocols from <h1 className="italic px-2"> Optimism </h1> ecosystem</header>
      <RankingObject chain='Optimism' />

    </div>
  )
}

export default Optimism
