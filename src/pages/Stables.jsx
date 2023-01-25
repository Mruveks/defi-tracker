import React, { useEffect, useState} from 'react'
import StablesRanking from '../components/StablesRanking'
import axios from 'axios'

const Stables = () => {

  return (
    <div >
      <header className="flex justify-center w-full text-white text-2xl italic">Stablecoin Ranking</header>
      <StablesRanking />
    </div>
  )
}

export default Stables
