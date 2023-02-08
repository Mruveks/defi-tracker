import React, { useState, useEffect} from 'react'
import axios from 'axios';

import Loader from './Loader';
import { Formatter } from '../utilities/Formatter';

const TVLranking = () => {

  const [protocols, setProtocols] = useState([])
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get('https://api.llama.fi/protocols')
      .then(res => {
        setProtocols(res.data)
        console.log(protocols)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

/** TVL ranking przyciski co by patrzec po chainie [All] [ETH] [TRON] [Polygon] [Avax] Scrollable window do wybierania innych łancuch*/
  return (
    <>
          <div className="flex justify-between mx-8 h-full text-white ">

        <button className="m-2 py-1 px-4 bg-gray-800 rounded-lg text-lg hover:bg-gray-700" onClick={() => setQuery('')}
        >All</button>
        
        <button className="m-2 py-1 px-4 bg-gray-800 rounded-lg text-lg hover:bg-gray-700" onClick={() => {setQuery('Ethereum')}}
        >Ethereum</button>

        <button className="m-2 py-1 px-4 bg-gray-800 rounded-lg text-lg hover:bg-gray-700" onClick={() => setQuery('Avalanche')}
        >Avalanche</button>

        <button className="m-2 py-1 px-4 bg-gray-800 rounded-lg text-lg hover:bg-gray-700" onClick={() => setQuery('Binance')}
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
    <div className="h-max mb-10 mx-10 border rounded-xl border-gray-400 bg-gray-800 text-white">
      <div className="grid grid-cols-7 p-2 border-black border-b ">
        <header>Name</header>
        <header className="text-right">Category</header>
        <header className="text-right">Chain</header>
        <header className="text-right">1d Change</header>
        <header className="text-right">7d Change</header>
        <header className="text-right">30d Change</header>
        <header className="text-right">TVL</header>
      </div>

        { ( query === '') ?
      
      ( protocols.length ? (
          protocols.filter(item => item.tvl != null).map(protocol =>
            <div
              className="grid grid-cols-7 items-center p-2 border-black border-b text-right"
              key={protocol.id}
            >
              <div className="flex w-[140%] text-left">
              <img src={protocol.logo} alt="logo" className="h-8 w-8 rounded-full" />
              <a href={protocol.url} alt="site" target="_blank" className="w-full h-full px-2 my-auto">{protocol.name}</a>
              </div>

              <div>{ protocol.category }</div>
              <div className="text-right">
                {protocol.chain}
                </div>
              
                { `${parseFloat(protocol.change_1h).toFixed(2)}` > 0 ? (<div className="text-green-500">+{parseFloat(protocol.change_1h).toFixed(2)}%</div>):(<div className="text-red-500">{parseFloat(protocol.change_1h).toFixed(2)}%</div>)}
              
                {`${parseFloat(protocol.change_1d).toFixed(2)}` > 0 ? (<div className="text-green-500">+{parseFloat(protocol.change_1d).toFixed(2)}%</div>):(<div className="text-red-500">{parseFloat(protocol.change_1d).toFixed(2)}%</div>)}
              
                {`${parseFloat(protocol.change_7d).toFixed(2)}` > 0 ? (<div className="text-green-500">+{parseFloat(protocol.change_7d).toFixed(2)}%</div>):(<div className="text-red-500">{parseFloat(protocol.change_7d).toFixed(2)}%</div>)}
              
                {'$' + Formatter(parseFloat(protocol.tvl))}
              

            </div>)
        ) : <Loader />
      )

      :

      ((protocols.length) ? (
          protocols.filter(item => (item.tvl != null && (item.chain === query ))).map(protocol =>
            <div
              className="grid grid-cols-7 items-center p-2 border-black border-b text-right"
              key={protocol.id}
            >
              <div className="flex w-[140%] text-left">
              <img src={protocol.logo} alt="logo" className="h-8 w-8 rounded-full" />
              <a href={protocol.url} alt="site" target="_blank" className="w-full h-full px-2 my-auto">{protocol.name}</a>
              </div>

              <div>{ protocol.category }</div>
              <div className="text-right">
                {protocol.chain}
                </div>
              
                { `${parseFloat(protocol.change_1h).toFixed(2)}` > 0 ? (<div className="text-green-500">+{parseFloat(protocol.change_1h).toFixed(2)}%</div>):(<div className="text-red-500">{parseFloat(protocol.change_1h).toFixed(2)}%</div>)}
              
                {`${parseFloat(protocol.change_1d).toFixed(2)}` > 0 ? (<div className="text-green-500">+{parseFloat(protocol.change_1d).toFixed(2)}%</div>):(<div className="text-red-500">{parseFloat(protocol.change_1d).toFixed(2)}%</div>)}
              
                {`${parseFloat(protocol.change_7d).toFixed(2)}` > 0 ? (<div className="text-green-500">+{parseFloat(protocol.change_7d).toFixed(2)}%</div>):(<div className="text-red-500">{parseFloat(protocol.change_7d).toFixed(2)}%</div>)}
              
                {'$' + Formatter(parseFloat(protocol.tvl))}
              

            </div>)
        ) : <Loader />
        )
      }
      
      </div>
  </>
  )
}

export default TVLranking
