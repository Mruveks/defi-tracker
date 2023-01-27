import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Commafy from '../utilities/Commafy';
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
    
    <div className="h-max m-10 border rounded-xl border-gray-400 bg-gray-800 text-white">
    <div className="grid grid-cols-7 p-2 border-black border-b ">
      <header className="font-bold italic">Project</header>
      <header className="text-right font-bold italic">Category</header>
      <header className="text-right font-bold italic">Daily Fees</header>
      <header className="text-right font-bold italic">Daily Holder Revenue</header>
      <header className="text-right font-bold italic">Daily Protocol Revenue</header>
      <header className="text-right font-bold italic">Revenue</header>
      <header className="text-right font-bold italic">All time fees</header>
    </div>

    {fees.length ?
      (
        fees.map(fee =>
          <div
            className="grid grid-cols-7 p-2 border-black border-b"
            key={fee.id}
          >
            <div className="">{fee.displayName}</div>
            <div className="text-right">{fee.category}</div>

            <div className="text-right">{fee.dailyFees ? (<div><Commafy num={parseFloat(fee.dailyFees).toFixed(2)}/> $</div>) : ('')}</div>

            <div className="text-right">{fee.dailyHoldersRevenue ? (<div><Commafy num={parseFloat(fee.dailyHoldersRevenue).toFixed(2)}/> $</div>) : ('')}</div>

            <div className="text-right">{fee.dailyProtocolRevenue ? (<div><Commafy num={parseFloat(fee.dailyProtocolRevenue).toFixed(2)}/> $</div>) : ('')}</div>

            <div className="text-right">{fee.dailyRevenue ? (<div><Commafy num={parseFloat(fee.dailyRevenue).toFixed(2)}/> $</div>) : ('')}</div>

            <div className="text-right">{fee.totalAllTime ? (<div><Commafy num={parseFloat(fee.totalAllTime).toFixed(2)}/> $</div>) : ('')}</div>


          </div>)
      )
        : (<Loader />)}


  </div>
)
}

export default FeesRanking