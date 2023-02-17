import React, { useEffect, useState} from 'react'
import axios from 'axios'

import StablesRanking from '../components/StablesRanking'
import StablesTVLchart from '../components/charts/StablesTVLchart'

const Stables = () => {

  return (
    <div className="grid grid-cols-1 w-full text-md" >
     <div className="h-max my-5 mx-10 text-white">
        <StablesTVLchart />
      </div>
      <header className="text-center text-white pt-10 mb-10 text-4xl italic">Stablecoin Ranking</header>
      <StablesRanking />
    </div>
  )
}

export default Stables
