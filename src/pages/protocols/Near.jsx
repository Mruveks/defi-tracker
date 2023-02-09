import React from 'react'

import ChartObject from '../../components/charts/ChartObject'
import RankingObject from '../../components/RankingObject';

const Near = () => {

  return (

    <div className="grid grid-cols-1 w-full text-md">

      <div className="text-center text-white pt-10 mb-5 text-4xl italic">
      Near
      </div>
      
      <div className="h-max my-5 mx-10 text-white">
        <ChartObject chain='Near' />
      </div>
      
      <header className="flex justify-center w-full mt-5 text-white text-3xl">Top protocols from <h1 className="italic px-2"> Near </h1> ecosystem</header>
      <RankingObject chain='Near' />

    </div>
  )
}

export default Near