import React, { useState, useEffect} from 'react'
import axios from 'axios';

import Loader from './Loader';
import Commafy from '../utilities/Commafy'

const TVLranking = () => {

  const [protocols, setProtocols] = useState([])

  useEffect(() => {
    axios.get('https://api.llama.fi/protocols')
      .then(res => {
        setProtocols(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);


    return (
    <div className="h-max m-10 border rounded-xl border-gray-400 bg-gray-800 text-white">
      <div className="grid grid-cols-7 p-2 border-black border-b ">
        <header>Name</header>
        <header className="text-right">Category</header>
        <header className="text-right">Chains</header>
        <header className="text-right">1d Change</header>
        <header className="text-right">7d Change</header>
        <header className="text-right">30d Change</header>
        <header className="text-right">TVL</header>
      </div>

      { protocols.length ? (
          protocols.filter(item => item.tvl != null).map(protocol =>
            <div
              className="grid grid-cols-7 p-2 border-black border-b"
              key={protocol.id}
            >
              <div className="flex w-[140%]">
              <img src={protocol.logo} alt="logo" className="h-8 w-8 rounded-full" />
              <a href={protocol.url} alt="site" target="_blank" className="w-full h-full px-2 my-auto">{protocol.name}</a>
              </div>

              <div className="text-right">{ protocol.category }</div>
              <div className="text-right">
                {protocol.chain}
                </div>
              <div className="text-right">
                {
                `${parseFloat(protocol.change_1h).toFixed(2)}` > 0 ? (<div className="text-green-500">+{parseFloat(protocol.change_1h).toFixed(2)}%</div>):(<div className="text-red-500">{parseFloat(protocol.change_1h).toFixed(2)}%</div>)
                }
              </div>
              <div className="text-right">
                {
                `${parseFloat(protocol.change_1d).toFixed(2)}` > 0 ? (<div className="text-green-500">+{parseFloat(protocol.change_1d).toFixed(2)}%</div>):(<div className="text-red-500">{parseFloat(protocol.change_1d).toFixed(2)}%</div>)
                }
              </div>
              <div className="text-right">
                {
                `${parseFloat(protocol.change_7d).toFixed(2)}` > 0 ? (<div className="text-green-500">+{parseFloat(protocol.change_7d).toFixed(2)}%</div>):(<div className="text-red-500">{parseFloat(protocol.change_7d).toFixed(2)}%</div>)
                }
              </div>
              <div className="text-right">
                <Commafy num={(parseFloat(protocol.tvl).toFixed(2))  + ' $'} />
              </div>

            </div>)
      ) : <Loader />}
      
    </div>
  )
}

export default TVLranking
