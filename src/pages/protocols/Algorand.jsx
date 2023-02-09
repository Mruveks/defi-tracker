import React from 'react'

import ChartObject from '../../components/charts/ChartObject'
import RankingObject from '../../components/RankingObject';

const Algorand = () => {

  return (

    <div className="grid grid-cols-1 w-full text-md">

      <div className="text-center text-white pt-10 mb-5 text-4xl italic">
      Algorand
      </div>
      
      <div className="h-max my-5 mx-10 text-white">
        <ChartObject chain='Algorand' />
      </div>
      
      <header className="flex justify-center w-full mt-5 text-white text-3xl">Top protocols from <h1 className="italic px-2"> Algorand </h1> ecosystem</header>
      <RankingObject chain='Algorand' />

    </div>
  )
}

export default Algorand