import React, {useState, useEffect} from 'react'
import axios from 'axios'

import { Formatter } from '../utilities/Formatter';
import Loader from './Loader';

const FeesRanking = () => {

  const [fees, setFees] = useState([]);

  useEffect(() => {
    axios.get('https://api.llama.fi/overview/fees?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyFees')
      .then(res => {
        setFees(res.data.protocols)
        console.log(res.data.protocols)
      })
      .catch(err => console.log(err))
  }, []);

  return (
    
    <div className="h-max m-10 border rounded-xl border-white bg-gray-800 text-white">
    <div className="grid grid-cols-7 p-2 uppercase italic border-white border-b ">
      <header className="font-bold italic">Project</header>
      <header className="text-right font-bold italic">Category</header>
      <header className="text-right font-bold italic">Daily Fees</header>
      <header className="text-right font-bold italic">Daily Holder Revenue</header>
      <header className="text-right font-bold italic">Daily Protocol Revenue</header>
      <header className="text-right font-bold italic">Revenue</header>
      <header className="text-right font-bold italic">All time collected fees</header>
    </div>

    {fees.length ?
      (
        fees.filter(item => item.dailyFees != null && item.dailyFees != '0' && item.totalAllTime != '0' && item.totalAllTime != null).map(fee =>
          <div
            className="grid grid-cols-7 p-2 border-black border-t"
            key={fee.id}
          >
            <div className="flex w-[140%]">
              <img src={fee.logo}  alt="logo" className="h-8 w-8 rounded-full"/>
              <div className="pl-2">{fee.displayName}</div>
            </div> 
            
            <div className="text-right">{fee.category}</div>

            <div className="text-right">{fee.dailyFees ? ('$' + Formatter(parseFloat(fee.dailyFees))) : ('')}</div>

            <div className="text-right">{fee.dailyHoldersRevenue ? ('$' + Formatter(parseFloat(fee.dailyHoldersRevenue))) : ('')}</div>

            <div className="text-right">{fee.dailyProtocolRevenue ? ('$' + Formatter(parseFloat(fee.dailyProtocolRevenue))) : ('')}</div>

            <div className="text-right">{fee.dailyRevenue ? ('$' + Formatter(parseFloat(fee.dailyRevenue))) : ('')}</div>

            <div className="text-right">{fee.totalAllTime ? ('$' + Formatter(parseFloat(fee.totalAllTime))) : ('')}</div>


          </div>)
      )
        : (<Loader />)}


  </div>
)
}

export default FeesRanking