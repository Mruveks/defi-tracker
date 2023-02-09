import React, { useState, useEffect} from 'react'
import Loader from './Loader';
import axios from 'axios';
import { Formatter } from '../utilities/Formatter';

const RankingObject = ({ chain }) => {
  
  const [protocols, setProtocols] = useState([]);

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

  /* dodac support dla mini chartow tvl**/

  return (
    <div className="h-max m-10 border rounded-xl border-gray-400 bg-gray-800 text-white">

    <div className="grid grid-cols-6 p-2 border-black border-b uppercase italic">
      <header>Name</header>
      <header className="text-right">Category</header>
      <header className="text-right">1d Change</header>
      <header className="text-right">7d Change</header>
      <header className="text-right">30d Change</header>
      <header className="text-right">TVL</header>
      </div>
      
    {protocols.length ? (
          protocols.filter(item => item.tvl != null && item.chain === chain ).map(protocol =>
            <div
              className="grid grid-cols-6 items-center p-2 border-black border-b text-right"
              key={protocol.id}
            >
              <div className="flex w-[140%] text-left">
              <img src={protocol.logo} alt="logo" className="h-8 w-8 rounded-full" />
              <a href={protocol.url} alt="site" target="_blank" className="w-full h-full px-2 my-auto">{protocol.name}</a>
              </div>

              <div>{ protocol.category }</div>
              
                { `${parseFloat(protocol.change_1h).toFixed(2)}` > 0 ? (<div className="text-green-500">+{parseFloat(protocol.change_1h).toFixed(2)}%</div>):(<div className="text-red-500">{parseFloat(protocol.change_1h).toFixed(2)}%</div>)}
              
                {`${parseFloat(protocol.change_1d).toFixed(2)}` > 0 ? (<div className="text-green-500">+{parseFloat(protocol.change_1d).toFixed(2)}%</div>):(<div className="text-red-500">{parseFloat(protocol.change_1d).toFixed(2)}%</div>)}
              
                {`${parseFloat(protocol.change_7d).toFixed(2)}` > 0 ? (<div className="text-green-500">+{parseFloat(protocol.change_7d).toFixed(2)}%</div>):(<div className="text-red-500">{parseFloat(protocol.change_7d).toFixed(2)}%</div>)}
              
                {'$' + Formatter(parseFloat(protocol.tvl))}
              

            </div>)
        ) : <Loader />
        }


  </div>
  )
}

export default RankingObject
