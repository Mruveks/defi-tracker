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
        console.log(bridges[5].lastDailyVolume)
      })
      .catch(err => console.log(err))
  }, []);


  return (
    <div className="h-max m-10 border rounded-xl border-white bg-gray-800 text-white">
      <div className="grid grid-cols-4 p-2 text-right uppercase italic border-white border-b ">
        <header className="text-left">Name</header>
        <header>Chain</header>
        <header>1d change</header>
        <header>Monthly Volume</header>
 

      </div>
      {bridges ? (
        bridges.filter(bridge => bridge.monthlyVolume > 0).map(bridge => 
          <div
          className="grid grid-cols-4  text-right p-2 border-black border-t" 
          key={bridge.id}
          >
             <div className="text-left">{ bridge.displayName }</div>

            <div className="capitalize">{bridge.name}</div>
            
            <div>{((bridge.volumePrevDay - bridge.dayBeforeLastVolume) / bridge.dayBeforeLastVolume).toFixed(2) * 100}%</div>

            <div className=""><div>{'$' + Formatter(parseFloat(bridge.monthlyVolume))}</div></div>
            
          </div>
        )
      )  : (<Loader />)
        
      }
    
    </div>
  )
}

export default BridgesRanking
