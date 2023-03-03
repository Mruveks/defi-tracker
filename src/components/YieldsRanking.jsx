import React, { useState, useEffect }from 'react'
import axios from 'axios';

import Loader from './Loader';
import { Formatter } from '../utilities/Formatter';

const YieldsRanking = () => {

  const [query, setQuery] = useState('')
  const [Yields, setYields] = useState([])

  useEffect(() => {
    axios.get('https://yields.llama.fi/pools')
      .then(res => {
        setYields(res.data.data)
        console.log(Yields)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  return (
    <>
    <div className="flex justify-between mx-8 h-full  py-2">
      <button className="m-2 py-1 px-4 bg-gray-600 rounded-lg text-lg hover:bg-gray-600" onClick={() => setQuery('')}
      >All</button>
        
      <button className="m-2 py-1 px-4 bg-gray-600 rounded-lg text-lg hover:bg-gray-600" onClick={() => {setQuery('Ethereum')}}
      >Ethereum</button>

      <button className="m-2 py-1 px-4 bg-gray-600 rounded-lg text-lg hover:bg-gray-600" onClick={() => setQuery('Avalanche')}
      >Avalanche</button>

      <button className="m-2 py-1 px-4 bg-gray-600 rounded-lg text-lg hover:bg-gray-600" onClick={() => setQuery('BSC')}
      >Bsc</button>

      <button className="m-2 py-1 px-4 bg-gray-600 rounded-lg text-lg hover:bg-gray-600" onClick={() => setQuery('Tron')}
      >Tron</button>

      <button className="m-2 py-1 px-4 bg-gray-600 rounded-lg text-lg hover:bg-gray-600" onClick={() => setQuery('Arbitrum')}
      >Arbitrum</button>

      <button className="m-2 py-1 px-4 bg-gray-600 rounded-lg text-lg hover:bg-gray-600" onClick={() => setQuery('Polygon')}
      >Polygon</button>

      <button className="m-2 py-1 px-4 bg-gray-600 rounded-lg text-lg hover:bg-gray-600" onClick={() => setQuery('Optimism')}
      >Optimism</button>

      <button className="m-2 py-1 px-4 bg-gray-600 rounded-lg text-lg hover:bg-gray-600" onClick={() => setQuery('Solana')}
      >Solana</button>
    </div>
    <div className="h-max mb-10 mx-10 border rounded-xl border-gray-600 ">
      
      <div className="grid grid-cols-7 p-2 border-gray-600 border-b text-right uppercase italic">
        <header className="text-left">Project</header>
        <header>Symbol</header>
        <header>Chain</header>
        <header>APY</header>
        <header>Base APY</header>
        <header>Reward APY</header>
        <header>TVL</header>
      </div>

      { query === '' ?
      (Yields.length ?
        (
          Yields.filter(item => item.apy != null && item.apy != '0' && item.tvlUsd >= 1000000).map(pool =>
            <div
              className="grid grid-cols-7 items-center p-2 border-gray-600 border-t text-right"
              key={pool.id}
            >
              <div className="text-left capitalize text-blue-400">{pool.project}</div>
              <div>{(pool.symbol).toLowerCase()}</div>
              <div>{pool.chain}</div>
              

              {pool.apy ? (<div>{parseFloat(pool.apy).toFixed(2) + '%'}</div>) : null}

              {pool.apyBase ? (<div>{parseFloat(pool.apyBase).toFixed(2)  + '%'}</div>) : null}

              {pool.apyReward ? (<div>{parseFloat(pool.apyReward).toFixed(2)  + '%'}</div>) : null}

              {'$' + Formatter(parseFloat(pool.tvlUsd)) }
              
            </div>
          )
        ) : (<Loader />))
        
      :
      
      (Yields.length ?
        (
          Yields.filter(item => item.apy != null && item.apy != '0' && item.tvlUsd >= 1000000 && item.chain === query).map(pool =>
            <div
              className="grid grid-cols-7 items-center p-2 border-gray-600 border-t text-right"
              key={pool.id}
            >
              <div className="text-left capitalize text-blue-400">{pool.project}</div>
              <div>{(pool.symbol).toLowerCase()}</div>
              <div>{pool.chain}</div>
              

              {pool.apy ? (<div>{parseFloat(pool.apy).toFixed(2) + '%'}</div>) : null}

              {pool.apyBase ? (<div>{parseFloat(pool.apyBase).toFixed(2)  + '%'}</div>) : null}

              {pool.apyReward ? (<div>{parseFloat(pool.apyReward).toFixed(2)  + '%'}</div>) : null}

              {'$' + Formatter(parseFloat(pool.tvlUsd)) }
              
            </div>)
          ): (<Loader />)
        )
      }
      </div>
    </>
  )
}

export default YieldsRanking
