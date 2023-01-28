import React, { useState, useEffect }from 'react'
import axios from 'axios';

import Loader from './Loader';
import Commafy from '../utilities/Commafy'
import ToUpperCase from '../utilities/ToUpperCase';

const YieldsRanking = () => {

  const [Yields, setYields] = useState([])

  useEffect(() => {
    axios.get('https://yields.llama.fi/pools')
      .then(res => {
        setYields(res.data.data)
        console.log(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  return (
    
      <div className="h-max m-10 border rounded-xl border-gray-400 bg-gray-800 text-white">
      <div className="grid grid-cols-7 p-2 border-black border-b ">
        <header className="font-bold italic">Symbol</header>
        <header className="text-right font-bold italic">Project</header>
        <header className="text-right font-bold italic">Chain</header>
        <header className="text-right font-bold italic">TVL</header>
        <header className="text-right font-bold italic">APY</header>
        <header className="text-right font-bold italic">Base APY</header>
        <header className="text-right font-bold italic">Reward APY</header>
      </div>

      {Yields.length ?
        (
          Yields.map(pool =>
            <div
              className="grid grid-cols-7 p-2 border-black border-b"
              key={pool.id}
            >
              <div >{pool.symbol}</div>
              <div className="text-right"><ToUpperCase word = {pool.project}/></div>
              <div className="text-right">{pool.chain}</div>
              <div className="text-right">
                <Commafy num={(parseFloat(pool.tvlUsd)) + ' $'} /> 
              </div>
              <div className="text-right">
                {pool.apy ? (`${parseFloat(pool.apy).toFixed(2)}%`) : ('')}
              </div>
              <div className="text-right">
                {pool.apyBase ? (`${parseFloat(pool.apyBase).toFixed(2)}%`) : ('')}
              </div>
              <div className="text-right">
              {pool.apyReward ? (`${parseFloat(pool.apyReward).toFixed(2)}%`) : ('')}
              </div>

            </div>)
        )
          : (<Loader />)}


    </div>
  )
}

export default YieldsRanking
