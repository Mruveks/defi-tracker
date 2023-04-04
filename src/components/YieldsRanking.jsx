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

  const buttonStyle = `m-2 py-1 px-4 bg-gray-700 rounded-lg text-lg`

  return (
    <>
    <div className="flex justify-between mx-8 h-full py-2">
    <button className={`${buttonStyle} ${query === '' ? 'bg-gray-900' : ''}`} onClick={() => setQuery('')}
      >All</button>
        
      <button className={`${buttonStyle} ${query === 'Ethereum' ? 'bg-gray-400' : ''}`} onClick={() => setQuery('Ethereum')}
      >Ethereum</button>

      <button className={`${buttonStyle} ${query === 'Avalanche' ? 'bg-red-700' : ''}`} onClick={() => setQuery('Avalanche')}
      >Avalanche</button>

      <button className={`${buttonStyle} ${query === 'Binance' ? 'bg-yellow-700' : ''}`}onClick={() => setQuery('Binance')}
      >Bsc</button>

      <button className={`${buttonStyle} ${query === 'Tron' ? 'bg-red-700' : ''}`} onClick={() => setQuery('Tron')}
      >Tron</button>

      <button className={`${buttonStyle} ${query === 'Arbitrum' ? 'bg-blue-700' : ''}`} onClick={() => setQuery('Arbitrum')}
      >Arbitrum</button>

      <button className={`${buttonStyle} ${query === 'Polygon' ? 'bg-purple-700' : ''}`} onClick={() => setQuery('Polygon')}
      >Polygon</button>

      <button className={`${buttonStyle} ${query === 'Optimism' ? 'bg-red-700' : ''}`} onClick={() => setQuery('Optimism')}
      >Optimism</button>

      <button className={`${buttonStyle} ${query === 'Solana' ? 'bg-purple-700' : ''}`} onClick={() => setQuery('Solana')}
      >Solana</button>
    </div>
    <div className="h-max mb-10 mx-10 border rounded-xl border-gray-600 p-2">
      
      <div className="grid grid-cols-7 p-2 text-right uppercase italic">
        <header className="text-left">Pool</header>
        <header className="text-left">Project</header>
        <header>Chain</header>
        <header>APY</header>
        <header>Base APY</header>
        <header>Reward APY</header>
        <header>TVL</header>
      </div>

      { query === '' ?
        Yields.length ?       
          Yields.filter(item => item.apy != null && item.apy != '0' && item.tvlUsd >= 1000000).map(pool =>
            <div
              className="grid grid-cols-7 items-center p-2 border-gray-600 border-t text-right"
              key={pool.id}
            >
              <div className="text-left capitalize">{(pool.symbol).toLowerCase()}</div>
              <div className="text-left capitalize text-blue-400">{pool.project}</div>
              <div>{pool.chain}</div>             

              {pool.apy ? <div>{parseFloat(pool.apy).toFixed(2) + '%'}</div> : <div></div>}

              {pool.apyBase ? <div>{parseFloat(pool.apyBase).toFixed(2)  + '%'}</div> : <div></div>}

              {pool.apyReward ? <div>{parseFloat(pool.apyReward).toFixed(2)  + '%'}</div> : <div></div>}

              {'$' + Formatter(parseFloat(pool.tvlUsd)) }
              
            </div>       
        ) : <Loader />       
      :
        Yields.length ?
          Yields.filter(item => item.apy != null && item.apy != '0' && item.tvlUsd >= 1000000 && item.chain === query).map(pool =>
            <div
              className="grid grid-cols-7 items-center p-2 border-gray-600 border-t text-right"
              key={pool.id}
            >
              <div className="text-left capitalize">{(pool.symbol).toLowerCase()}</div>
              <div className="text-left capitalize text-blue-400">{pool.project}</div>
              <div>{pool.chain}</div>
              
              {pool.apy ? <div>{parseFloat(pool.apy).toFixed(2) + '%'}</div> : <div></div>}

              {pool.apyBase ? <div>{parseFloat(pool.apyBase).toFixed(2)  + '%'}</div> : <div></div>}

              {pool.apyReward ? <div>{parseFloat(pool.apyReward).toFixed(2)  + '%'}</div> : <div></div>}

              {'$' + Formatter(parseFloat(pool.tvlUsd)) }
              
            </div>
          ) : <Loader />
      }
      </div>
    </>
  )
}

export default YieldsRanking
