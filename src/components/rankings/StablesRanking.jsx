import React, {useEffect, useState} from 'react'
import axios from 'axios';

import Loader from '../Loader';
import numeral from 'numeral'; 
import CalculateChange from '../../utilities/CalculateChange';

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
    <div className="h-max mb-10 border-gray-600 p-2 border rounded-xl bg-gray-800 ">
      
      <div className="grid sm:grid-cols-4 grid-cols-7 p-2 text-right uppercase italic border-b-gray-600 ">
        <header className="text-left">Name</header>
        <header>Price</header>
        <header className="sm:hidden block">Peg Mechanism</header>
        <header >1d Change</header>
        <header className="sm:hidden block">7d Change</header>
        <header className="sm:hidden block">1m Change</header>
        <header >MarketCap</header>
      </div>

      { stables.length ? 
          stables.filter(item => (item.circulating.peggedUSD >= 1000000 || item.circulating.peggedEUR >= 1000000 || item.circulating.peggedVAR >= 1000000) && item.price != null)
            .map(stable =>
            <div
              className="grid sm:grid-cols-4 grid-cols-7 items-center p-2 border-gray-600 border-t text-right"
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
                
              <div className="sm:hidden block">{stable.pegMechanism}</div>
              
              {/* CALCULATING DAILY CHANGE */}
              {stable.circulating.peggedEUR ?
                stable.circulatingPrevDay.peggedEUR ?
                  <CalculateChange lastDay={stable.circulating.peggedEUR} today={stable.circulatingPrevDay.peggedEUR} /> : <div></div>
                : null}
              
              {stable.circulating.peggedUSD ?
                stable.circulatingPrevDay.peggedUSD ?
                  <CalculateChange lastDay={stable.circulating.peggedUSD} today={stable.circulatingPrevDay.peggedUSD} /> : <div></div>
                : null}
              
              {stable.circulating.peggedVAR ?
                stable.circulatingPrevDay.peggedVAR ?
                  <CalculateChange lastDay={stable.circulating.peggedVAR} today={stable.circulatingPrevDay.peggedVAR} /> : <div></div>
                : null}
              
              {/* CALCULATING WEEKLY CHANGE */}
              {stable.circulating.peggedEUR ?
                stable.circulatingPrevWeek.peggedEUR ?
                  <div className="sm:hidden block"><CalculateChange lastDay={stable.circulating.peggedEUR} today={stable.circulatingPrevWeek.peggedEUR} /></div> : <div></div>
                : null}

              {stable.circulating.peggedUSD ?
                stable.circulatingPrevWeek.peggedUSD ?
                <div className="sm:hidden block"><CalculateChange lastDay={stable.circulating.peggedUSD} today={stable.circulatingPrevWeek.peggedUSD} /></div> : <div></div>
                : null}

              {stable.circulating.peggedVAR ?
                stable.circulatingPrevWeek.peggedVAR ?
                  <div className="sm:hidden block"><CalculateChange lastDay={stable.circulating.peggedVAR} today={stable.circulatingPrevWeek.peggedVAR} /></div> : <div></div>
                : null}
                
                {/* CALCULATING MONTHLY CHANGE */}
              {stable.circulating.peggedEUR ?
                stable.circulatingPrevMonth.peggedEUR ?
                  <div className="sm:hidden block"><CalculateChange lastDay={stable.circulating.peggedEUR} today={stable.circulatingPrevMonth.peggedEUR} /></div> : <div></div>
                : null}
              
              {stable.circulating.peggedUSD ?
                stable.circulatingPrevMonth.peggedUSD ?
                  <div className="sm:hidden block"><CalculateChange lastDay={stable.circulating.peggedUSD} today={stable.circulatingPrevMonth.peggedUSD} /></div> : <div></div>
                : null}

              {stable.circulating.peggedVAR ?
                stable.circulatingPrevMonth.peggedVAR ?
                  <div className="sm:hidden block"><CalculateChange lastDay={stable.circulating.peggedVAR} today={stable.circulatingPrevMonth.peggedVAR} /></div>  : <div></div>
                : null}
                      
              {stable.circulating.peggedUSD ? numeral(stable.circulating.peggedUSD).format("$0.00a") : null}
              {stable.circulating.peggedEUR ? numeral(stable.circulating.peggedEUR * 1.08).format("$0.00a") : null}
              {stable.circulating.peggedVAR ? numeral(stable.circulating.peggedVAR).format("$0.00a") : null}
            </div>)
      : <Loader />}
      
    </div>
  </>
  )
}
export default StablesRanking
