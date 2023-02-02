import React, { useEffect, useState} from 'react'
import axios from 'axios'

import StablesRanking from '../components/StablesRanking'
import StablesTVLchart from '../components/charts/StablesTVLchart'

const Stables = () => {

  return (
    <div >
      <StablesTVLchart />
      <header className="flex justify-center w-full text-white text-2xl italic">Stablecoin Ranking</header>
      <StablesRanking />
    </div>
  )
}

export default Stables
