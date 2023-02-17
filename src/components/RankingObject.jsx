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

  /* dodac support dla mini chartow tvl**/

  return (
    <div className="h-max m-10 border rounded-xl border-white bg-gray-800 text-white">

    <div className={`grid ${(chain === 'Lending' || 'CEX') ? "grid-cols-5" : "grid-cols-6"} p-2 uppercase italic norder-white border-b`}>
        <header>Name</header>
        
      {(chain === 'Lending' || 'CEX' || 'DEX') ? null : <header className="text-right">Category</header>}
      <header className="text-right">1d Change</header>
      <header className="text-right">7d Change</header>
      <header className="text-right">30d Change</header>
      <header className="text-right">TVL</header>
    </div>
      
    {protocols.length ? (
          protocols.filter(item => item.tvl != null && (item.chain === chain || item.category === chain) && item.tvl >= 100000).map(protocol =>
            <div
              className={`grid ${(chain === 'Lending' || 'CEX') ? "grid-cols-5" : "grid-cols-6"} items-center p-2 border-gray-600 border-t text-right`}
              key={protocol.id}
            >
              <div className="flex w-[140%] text-left">
                <img src={protocol.logo} alt="logo" className="h-8 w-8 rounded-full" />
                <a href={protocol.url} alt="site" target="_blank" className="w-full h-full px-2 my-auto">{protocol.name}</a>
              </div>
              {(chain === 'Lending' || 'CEX' || 'DEX') ? null : <div>{protocol.category}</div>}
              
              
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
