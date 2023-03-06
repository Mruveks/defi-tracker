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
      })
      .catch(err => {
        console.log(err)
      })
  }, []);
  console.log(chain)
  
  return (
    <div className="h-max m-10 border rounded-xl border-gray-600 p-2">

    <div className={`grid ${(chain === 'Lending' || 'CEX') ? "grid-cols-5" : "grid-cols-6"} p-2 uppercase italic text-right`}>
        
      <header className="text-left">Name</header> 
      {(chain === 'Lending' || 'CEX' || 'DEX') ? null : <header className="text-right">Category</header>}
      <header>1d Change</header>
      <header>7d Change</header>
      <header>30d Change</header>
      <header>TVL</header>
    </div>
      
    {protocols.length ? 
        protocols.filter(item => item.tvl != null && (item.chain === chain || item.category === chain) && item.tvl >= 100000)
          .map(protocol =>
            <div
              className={`grid ${(chain === 'Lending' || 'CEX' || 'DEX') ? "grid-cols-5" : "grid-cols-6"} items-center p-2 border-gray-600 border-t text-right`}
              key={protocol.id}
            >
              <a href={ protocol.url } target="_blank" className="flex w-max items-center text-left hover:bg-gray-600 rounded-full">
                <img src={ protocol.logo } alt="logo"  className="h-8 w-8 rounded-full" />
                <div className="px-2 my-auto text-blue-400">{ protocol.name }</div>
              </a>
              
              {(chain === 'Lending' || 'CEX' || 'DEX') ? null : <div>{protocol.category}</div>}
                           
              {
                protocol.change_1h > 0 ?
                  <div className="text-green-500">+{parseFloat(protocol.change_1h).toFixed(2)}%</div>
                  : <div className="text-red-500">{parseFloat(protocol.change_1h).toFixed(2)}%</div>
              }
              
              {
                protocol.change_1d > 0 ?
                  <div className="text-green-500">+{parseFloat(protocol.change_1d).toFixed(2)}%</div>
                  : <div className="text-red-500">{parseFloat(protocol.change_1d).toFixed(2)}%</div>
              }
              
              {
                protocol.change_7d > 0 ?
                  <div className="text-green-500">+{parseFloat(protocol.change_7d).toFixed(2)}%</div>
                  : <div className="text-red-500">{parseFloat(protocol.change_7d).toFixed(2)}%</div>
              }
              
              {'$' + Formatter(parseFloat(protocol.tvl))}
            </div>)
        : <Loader />
        }


  </div>
  )
}

export default RankingObject
