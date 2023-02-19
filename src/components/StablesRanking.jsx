import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Loader from './Loader';
import { Formatter } from '../utilities/Formatter';

const StablesRanking = () => {

  const [stables, setStables] = useState([]);

  useEffect(() => {
    axios.get('https://stablecoins.llama.fi/stablecoins?includePrices=true')
      .then(res => {
        setStables(res.data.peggedAssets)
        console.log(stables)
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

      { stables.length ? (
          stables.filter(item => (item.circulating.peggedUSD >= 1000000 || item.circulating.peggedEUR >= 1000000 || item.circulating.peggedVAR >= 1000000 ) && item.price != null ).map(stable =>
            <div
              className="grid grid-cols-8 items-center p-2 border-gray-600 border-t text-right"
              key={stable.id}
            >
              <div className="text-left text-blue-400 p-1">
                <a href={`https://www.coingecko.com/en/coins/${stable.gecko_id}`} alt="site" target="_blank" className="">{stable.name} ({stable.symbol})</a>
              </div>

              {stable.price ? (`${parseFloat(stable.price).toFixed(4)}` >= 1 ? (<div className="text-green-500">{parseFloat(stable.price).toFixed(4)}$</div>):(<div className="text-red-500">{parseFloat(stable.price).toFixed(4)}$</div>)) : ('')}

             <div>{stable.pegType.slice(6)}</div>
              <div>{stable.pegMechanism}</div>
              
              {/* CALCULATING DAILY CHANGE */}
              {stable.circulating.peggedEUR ?
                (stable.circulatingPrevDay.peggedEUR ?
                  (`${parseFloat(((parseFloat(stable.circulating.peggedEUR).toFixed(2) - parseFloat(stable.circulatingPrevDay.peggedEUR).toFixed(2)) / parseFloat(stable.circulatingPrevDay.peggedEUR).toFixed(2)) * 100).toFixed(2)}` > 0 ?
                    (<div className="text-green-500">+{parseFloat(((parseFloat(stable.circulating.peggedEUR).toFixed(2) - parseFloat(stable.circulatingPrevDay.peggedEUR).toFixed(2)) / parseFloat(stable.circulatingPrevDay.peggedEUR).toFixed(2)) * 100).toFixed(2)}%</div>
                    ) : (<div className="text-red-500">{parseFloat(((parseFloat(stable.circulating.peggedEUR).toFixed(2) - parseFloat(stable.circulatingPrevDay.peggedEUR).toFixed(2)) / parseFloat(stable.circulatingPrevDay.peggedEUR).toFixed(2)) * 100).toFixed(2)}%</div>)) : (''))
                : null}
                
              {stable.circulating.peggedUSD ?
                (stable.circulatingPrevDay.peggedUSD ?
                  (`${parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevDay.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevDay.peggedUSD).toFixed(2)) * 100).toFixed(2)}` > 0 ?
                    (<div className="text-green-500">+{parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevDay.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevDay.peggedUSD).toFixed(2)) * 100).toFixed(2)}%</div>
                    ) : (<div className="text-red-500">{parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevDay.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevDay.peggedUSD).toFixed(2)) * 100).toFixed(2)}%</div>)) : (''))
                : null}
              
              {stable.circulating.peggedVAR ?
                (stable.circulatingPrevWeek.peggedVAR ?
                  (`${parseFloat(((parseFloat(stable.circulating.peggedVAR).toFixed(2) - parseFloat(stable.circulatingPrevDay.peggedVAR).toFixed(2)) / parseFloat(stable.circulatingPrevDay.peggedVAR).toFixed(2)) * 100).toFixed(2)}` > 0 ?
                    (<div className="text-green-500">+{parseFloat(((parseFloat(stable.circulating.peggedVAR).toFixed(2) - parseFloat(stable.circulatingPrevDay.peggedVAR).toFixed(2)) / parseFloat(stable.circulatingPrevDay.peggedVAR).toFixed(2)) * 100).toFixed(2)}%</div>
                    ) : (<div className="text-red-500">{parseFloat(((parseFloat(stable.circulating.peggedVAR).toFixed(2) - parseFloat(stable.circulatingPrevDay.peggedVAR).toFixed(2)) / parseFloat(stable.circulatingPrevDay.peggedVAR).toFixed(2)) * 100).toFixed(2)}%</div>)) : (''))
                : null}
              
              {/* CALCULATING WEEKLY CHANGE */}
              {stable.circulating.peggedEUR ?
                (stable.circulatingPrevWeek.peggedEUR ?
                  (`${parseFloat(((parseFloat(stable.circulating.peggedEUR).toFixed(2) - parseFloat(stable.circulatingPrevWeek.peggedEUR).toFixed(2)) / parseFloat(stable.circulatingPrevWeek.peggedEUR).toFixed(2)) * 100).toFixed(2)}` > 0 ?
                    (<div className="text-green-500">+{parseFloat(((parseFloat(stable.circulating.peggedEUR).toFixed(2) - parseFloat(stable.circulatingPrevWeek.peggedEUR).toFixed(2)) / parseFloat(stable.circulatingPrevWeek.peggedEUR).toFixed(2)) * 100).toFixed(2)}%</div>
                    ) : (<div className="text-red-500">{parseFloat(((parseFloat(stable.circulating.peggedEUR).toFixed(2) - parseFloat(stable.circulatingPrevWeek.peggedEUR).toFixed(2)) / parseFloat(stable.circulatingPrevWeek.peggedEUR).toFixed(2)) * 100).toFixed(2)}%</div>)) : (''))
                : null}
                
              {stable.circulating.peggedUSD ?
                (stable.circulatingPrevWeek.peggedUSD ?
                  (`${parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevWeek.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevWeek.peggedUSD).toFixed(2)) * 100).toFixed(2)}` > 0 ?
                    (<div className="text-green-500">+{parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevWeek.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevWeek.peggedUSD).toFixed(2)) * 100).toFixed(2)}%</div>
                    ) : (<div className="text-red-500">{parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevWeek.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevWeek.peggedUSD).toFixed(2)) * 100).toFixed(2)}%</div>)) : (''))
                : null}
              
              {stable.circulating.peggedVAR ?
                (stable.circulatingPrevWeek.peggedVAR ?
                  (`${parseFloat(((parseFloat(stable.circulating.peggedVAR).toFixed(2) - parseFloat(stable.circulatingPrevWeek.peggedVAR).toFixed(2)) / parseFloat(stable.circulatingPrevWeek.peggedVAR).toFixed(2)) * 100).toFixed(2)}` > 0 ?
                    (<div className="text-green-500">+{parseFloat(((parseFloat(stable.circulating.peggedVAR).toFixed(2) - parseFloat(stable.circulatingPrevWeek.peggedVAR).toFixed(2)) / parseFloat(stable.circulatingPrevWeek.peggedVAR).toFixed(2)) * 100).toFixed(2)}%</div>
                    ) : (<div className="text-red-500">{parseFloat(((parseFloat(stable.circulating.peggedVAR).toFixed(2) - parseFloat(stable.circulatingPrevWeek.peggedVAR).toFixed(2)) / parseFloat(stable.circulatingPrevWeek.peggedVAR).toFixed(2)) * 100).toFixed(2)}%</div>)) : (''))
                : null}
                
                {/*CULATING MONTHLY CHANGE */}
              {stable.circulating.peggedEUR ?
                (stable.circulatingPrevMonth.peggedEUR ?
                  (`${parseFloat(((parseFloat(stable.circulating.peggedEUR).toFixed(2) - parseFloat(stable.circulatingPrevMonth.peggedEUR).toFixed(2)) / parseFloat(stable.circulatingPrevMonth.peggedEUR).toFixed(2)) * 100).toFixed(2)}` > 0 ?
                    (<div className="text-green-500">+{parseFloat(((parseFloat(stable.circulating.peggedEUR).toFixed(2) - parseFloat(stable.circulatingPrevMonth.peggedEUR).toFixed(2)) / parseFloat(stable.circulatingPrevMonth.peggedEUR).toFixed(2)) * 100).toFixed(2)}%</div>
                    ) : (<div className="text-red-500">{parseFloat(((parseFloat(stable.circulating.peggedEUR).toFixed(2) - parseFloat(stable.circulatingPrevMonth.peggedEUR).toFixed(2)) / parseFloat(stable.circulatingPrevMonth.peggedEUR).toFixed(2)) * 100).toFixed(2)}%</div>)) : (''))
                : null}
              {stable.circulating.peggedUSD ?
              (stable.circulatingPrevMonth.peggedUSD ?
                (`${parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevMonth.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevMonth.peggedUSD).toFixed(2)) * 100).toFixed(2)}` > 0 ?
                  (<div className="text-green-500">+{parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevMonth.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevMonth.peggedUSD).toFixed(2)) * 100).toFixed(2)}%</div>
                  ) : (<div className="text-red-500">{parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevMonth.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevMonth.peggedUSD).toFixed(2)) * 100).toFixed(2)}%</div>)) : null) : null}
              
              {stable.circulating.peggedVAR ?
              (stable.circulatingPrevMonth.peggedVAR ?
                (`${parseFloat(((parseFloat(stable.circulating.peggedVAR).toFixed(2) - parseFloat(stable.circulatingPrevMonth.peggedVAR).toFixed(2)) / parseFloat(stable.circulatingPrevMonth.peggedVAR).toFixed(2)) * 100).toFixed(2)}` > 0 ?
                  (<div className="text-green-500">+{parseFloat(((parseFloat(stable.circulating.peggedVAR).toFixed(2) - parseFloat(stable.circulatingPrevMonth.peggedVAR).toFixed(2)) / parseFloat(stable.circulatingPrevMonth.peggedVAR).toFixed(2)) * 100).toFixed(2)}%</div>
                  ) : (<div className="text-red-500">{parseFloat(((parseFloat(stable.circulating.peggedVAR).toFixed(2) - parseFloat(stable.circulatingPrevMonth.peggedVAR).toFixed(2)) / parseFloat(stable.circulatingPrevMonth.peggedVAR).toFixed(2)) * 100).toFixed(2)}%</div>)) : null) : null}
               
                      
              {stable.circulating.peggedUSD ? ('$' + Formatter(parseFloat(stable.circulating.peggedUSD))) : null}
              {stable.circulating.peggedEUR ? ('$' + Formatter(parseFloat(stable.circulating.peggedEUR * 1.06))) : null}
              {stable.circulating.peggedVAR ? ('$' + Formatter(parseFloat(stable.circulating.peggedVAR) )) : null}
            </div>)
      ) : <Loader />}
      
    </div>
</>
  )
}
export default StablesRanking
