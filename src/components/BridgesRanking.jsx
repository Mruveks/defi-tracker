import React, {useState, useEffect} from 'react'
import axios from 'axios'

import { Formatter } from '../utilities/Formatter';
import Loader from './Loader';


const BridgesRanking = () => {

  const [bridges, setBridges] = useState([]);

  useEffect(() => {
    axios.get('https://bridges.llama.fi/bridges?includeChains=true')
      .then(res => {
        setBridges(res.data.bridges)
        console.log(res.data.bridges)
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <div className="h-max m-10 border rounded-xl border-white bg-gray-800 text-white">
      <div className="grid grid-cols-3 p-2 uppercase italic border-white border-b ">
        <header className="">Name</header>
        <header className="text-right">Chain</header>
        <header className="text-right">Monthly Volume</header>
 

      </div>
      {bridges ? (
        bridges.map(bridge => 
          <div
          className="grid grid-cols-3 p-2 border-black border-t" 
          key={bridge.id}
          >
             <div className="">{ bridge.displayName }</div>

            <div className="text-right capitalize">{ bridge.name }</div>

            <div className="text-right"><div>{'$' + Formatter(parseFloat(bridge.monthlyVolume))}</div></div>
            
          </div>
        )
      )  : (<Loader />)
        
      }
    
    </div>
  )
}

export default BridgesRanking
