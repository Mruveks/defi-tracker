import React, {useEffect, useState} from 'react'
import axios from 'axios';

import Loader from './Loader';
import { Formatter } from '../utilities/Formatter';
import CalculateChange from '../utilities/CalculateChange';

const StablesRanking = () => {

  const [stables, setStables] = useState([]);

  useEffect(() => {
    axios.get('https://stablecoins.llama.fi/stablecoins?includePrices=true')
      .then(res => {
        setStables(res.data.peggedAssets)
      })
      .catch(err => console.log(err))
  }, []);

  return (
  <>
    <div className="h-max mx-10 mb-10 border-gray-600 p-2 border rounded-xl bg-gray-800 ">
      
      <div className="grid grid-cols-8 p-2 uppercase italic border-b-gray-600 ">
        <header className="">Name</header>
        <header className="text-right">Price</header>
        <header className="text-right">Peg Asset</header>
        <header className="text-right">Peg Mechanism</header>
        <header className="text-right">1d Change</header>
        <header className="text-right">7d Change</header>
        <header className="text-right">1m Change</header>
        <header className="text-right">MarketCap</header>
      </div>

      { stables.length ? 
          stables.filter(item => (item.circulating.peggedUSD >= 1000000 || item.circulating.peggedEUR >= 1000000 || item.circulating.peggedVAR >= 1000000) && item.price != null)
            .map(stable =>
            <div
              className="grid grid-cols-8 items-center p-2 border-gray-600 border-t text-right"
              key={stable.id}
            >
              <a href={`https://www.coingecko.com/en/coins/${stable.gecko_id}`} target="_blank" className="flex w-max items-center text-left hover:bg-gray-600 rounded-full h-8">
                <div className="px-1 my-auto text-blue-400">{ stable.name }</div>
                <div className="px-1 my-auto text-blue-400">({ stable.symbol })</div>
                </a>
                
              { stable.price >= 1 ?
                <div className="text-green-500">{parseFloat(stable.price).toFixed(2)}$</div>
                  : <div className="text-red-500">{parseFloat(stable.price).toFixed(2)}$</div>
              }

              <div>{stable.pegType.slice(6)}</div>
              <div>{stable.pegMechanism}</div>
              
              {/* CALCULATING DAILY CHANGE */}
              {stable.circulating.peggedEUR ?
                stable.circulatingPrevDay.peggedEUR ?
                  <CalculateChange lastDay={stable.circulating.peggedEUR} today={stable.circulatingPrevDay.peggedEUR} /> : null
                : null}
              
              {stable.circulating.peggedUSD ?
                stable.circulatingPrevDay.peggedUSD ?
                  <CalculateChange lastDay={stable.circulating.peggedUSD} today={stable.circulatingPrevDay.peggedUSD} /> : null
                : null}
              
              {stable.circulating.peggedVAR ?
                stable.circulatingPrevDay.peggedVAR ?
                  <CalculateChange lastDay={stable.circulating.peggedVAR} today={stable.circulatingPrevDay.peggedVAR} /> : null
                : null}
              
              {/* CALCULATING WEEKLY CHANGE */}
              {stable.circulating.peggedEUR ?
                stable.circulatingPrevWeek.peggedEUR ?
                  <CalculateChange lastDay={stable.circulating.peggedEUR} today={stable.circulatingPrevWeek.peggedEUR} /> : null
                : null}

              {stable.circulating.peggedUSD ?
                stable.circulatingPrevWeek.peggedUSD ?
                  <CalculateChange lastDay={stable.circulating.peggedUSD} today={stable.circulatingPrevWeek.peggedUSD} /> : null
                : null}

              {stable.circulating.peggedVAR ?
                stable.circulatingPrevWeek.peggedVAR ?
                  <CalculateChange lastDay={stable.circulating.peggedVAR} today={stable.circulatingPrevWeek.peggedVAR} /> : null
                : null}
                
                {/* CALCULATING MONTHLY CHANGE */}
              {stable.circulating.peggedEUR ?
                stable.circulatingPrevMonth.peggedEUR ?
                  <CalculateChange lastDay={stable.circulating.peggedEUR} today={stable.circulatingPrevMonth.peggedEUR} /> : null
                : null}
              
              {stable.circulating.peggedUSD ?
                stable.circulatingPrevMonth.peggedUSD ?
                  <CalculateChange lastDay={stable.circulating.peggedUSD} today={stable.circulatingPrevMonth.peggedUSD} /> : null
                : null}

              {stable.circulating.peggedVAR ?
                stable.circulatingPrevMonth.peggedVAR ?
                  <CalculateChange lastDay={stable.circulating.peggedVAR} today={stable.circulatingPrevMonth.peggedVAR} /> : null
                : null}
                      
              {stable.circulating.peggedUSD ? ('$' + Formatter(parseFloat(stable.circulating.peggedUSD))) : null}
              {stable.circulating.peggedEUR ? ('$' + Formatter(parseFloat(stable.circulating.peggedEUR * 1.08))) : null}
              {stable.circulating.peggedVAR ? ('$' + Formatter(parseFloat(stable.circulating.peggedVAR))) : null}
            </div>)
      : <Loader />}
      
    </div>
  </>
  )
}
export default StablesRanking
