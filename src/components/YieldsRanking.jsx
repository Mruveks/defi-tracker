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
    <div className="flex justify-between mx-8 h-full text-white ">
      <button className="m-2 py-1 px-4 bg-gray-800 rounded-lg text-lg hover:bg-gray-700" onClick={() => setQuery('')}
      >All</button>
        
      <button className="m-2 py-1 px-4 bg-gray-800 rounded-lg text-lg hover:bg-gray-700" onClick={() => {setQuery('Ethereum')}}
      >Ethereum</button>

      <button className="m-2 py-1 px-4 bg-gray-800 rounded-lg text-lg hover:bg-gray-700" onClick={() => setQuery('Avalanche')}
      >Avalanche</button>

      <button className="m-2 py-1 px-4 bg-gray-800 rounded-lg text-lg hover:bg-gray-700" onClick={() => setQuery('BSC')}
      >Bsc</button>

      <button className="m-2 py-1 px-4 bg-gray-800 rounded-lg text-lg hover:bg-gray-700" onClick={() => setQuery('Tron')}
      >Tron</button>

      <button className="m-2 py-1 px-4 bg-gray-800 rounded-lg text-lg hover:bg-gray-700" onClick={() => setQuery('Arbitrum')}
      >Arbitrum</button>

      <button className="m-2 py-1 px-4 bg-gray-800 rounded-lg text-lg hover:bg-gray-700" onClick={() => setQuery('Polygon')}
      >Polygon</button>

      <button className="m-2 py-1 px-4 bg-gray-800 rounded-lg text-lg hover:bg-gray-700" onClick={() => setQuery('Optimism')}
      >Optimism</button>

      <button className="m-2 py-1 px-4 bg-gray-800 rounded-lg text-lg hover:bg-gray-700" onClick={() => setQuery('Solana')}
      >Solana</button>
    </div>
    <div className="h-max mb-10 mx-10 border rounded-xl border-white bg-gray-800 text-white">
      
      
      <div className="grid grid-cols-7 p-2 border-white border-b ">
        <header className="font-bold italic">Project</header>
        <header className="text-right font-bold italic">Symbol</header>
        <header className="text-right font-bold italic">Chain</header>
        <header className="text-right font-bold italic">APY</header>
        <header className="text-right font-bold italic">Base APY</header>
        <header className="text-right font-bold italic">Reward APY</header>
        <header className="text-right font-bold italic">TVL</header>
      </div>

      { query === '' ?
      (Yields.length ?
        (
          Yields.filter(item => item.apy != null && item.apy != '0' && item.tvlUsd >= 1000000).map(pool =>
            <div
              className="grid grid-cols-7 items-center p-2 border-black border-t text-right"
              key={pool.id}
            >
              <div className="text-left capitalize">{pool.project}</div>
              <div>{pool.symbol}</div>
              <div>{pool.chain}</div>
              

              {pool.apy ? (<div>{parseFloat(pool.apy).toFixed(2) + '%'}</div>) : (<div> </div>)}

              {pool.apyBase ? (<div>{parseFloat(pool.apyBase).toFixed(2)  + '%'}</div>) : (<div> </div>)}

              {pool.apyReward ? (<div>{parseFloat(pool.apyReward).toFixed(2)  + '%'}</div>) : (<div> </div>)}

                {'$' + Formatter(parseFloat(pool.tvlUsd)) }
              
            </div>)
        )
          : (<Loader />))
        
        :
      
        (Yields.length ?
        (
          Yields.filter(item => item.apy != null && item.apy != '0' && item.tvlUsd >= 1000000 && item.chain === query).map(pool =>
            <div
              className="grid grid-cols-7 items-center p-2 border-black border-t text-right"
              key={pool.id}
            >
              <div className="text-left capitalize">{pool.project}</div>
              <div>{pool.symbol}</div>
              <div>{pool.chain}</div>
              

              {pool.apy ? (<div>{parseFloat(pool.apy).toFixed(2) + '%'}</div>) : (<div> </div>)}

              {pool.apyBase ? (<div>{parseFloat(pool.apyBase).toFixed(2)  + '%'}</div>) : (<div> </div>)}

              {pool.apyReward ? (<div>{parseFloat(pool.apyReward).toFixed(2)  + '%'}</div>) : (<div> </div>)}

                {'$' + Formatter(parseFloat(pool.tvlUsd)) }
              
            </div>)
        )
          : (<Loader />))}


      </div>
    </>
  )
}

export default YieldsRanking
