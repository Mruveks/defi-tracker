import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Loader from './Loader';

const StablesRanking = () => {

  const [stables, setStables] = useState([]);

  useEffect(() => {
    axios.get('https://stablecoins.llama.fi/stablecoins?includePrices=true')
      .then(res => {
        setStables(res.data.peggedAssets)
        console.log(res.data.peggedAssets)
      })
      .catch(err => console.log(err))
  }, []);

  function commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  }

  return (
    <div className="h-max m-10 border rounded-xl border-gray-400 bg-gray-800 text-white">
      <div className="grid grid-cols-7 p-2 border-black border-b ">
        <header className="text-right">Name</header>
        <header className="text-right">Price</header>
        <header className="text-right">Peg Type</header>
        <header className="text-right">1d Change</header>
        <header className="text-right">7d Change</header>
        <header className="text-right">1m Change</header>
        <header className="text-right">MarketCap</header>

      </div>

      { stables.length ? (
          stables.map(stable =>
            <div
              className="grid grid-cols-7 p-2 border-black border-b"
              key={stable.id}
            >
              <a href={`https://www.coingecko.com/en/coins/${stable.gecko_id}`} alt="site" target="_blank" className="text-right">{stable.name} ({stable.symbol})</a>
              
              <div className="text-right">
                {
                `${parseFloat(stable.price).toFixed(4)}` >= 1 ? (<div className="text-green-500">{parseFloat(stable.price).toFixed(4)}$</div>):(<div className="text-red-500">{parseFloat(stable.price).toFixed(4)}$</div>)
                }
              </div>

              <div className="text-right">
                {stable.pegType}
              </div>

              <div className="text-right">         
              {
                  `${parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevDay.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevDay.peggedUSD).toFixed(2)) * 100 ).toFixed(2)}` > 0 ? (<div className="text-green-500">+{parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevDay.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevDay.peggedUSD).toFixed(2)) * 100 ).toFixed(2)}%</div>) : (<div className="text-red-500">{parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevDay.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevDay.peggedUSD).toFixed(2)) * 100 ).toFixed(2)}%</div>)
                }
              </div>
              <div className="text-right">
              {
                  `${parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevWeek.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevWeek.peggedUSD).toFixed(2)) * 100 ).toFixed(2)}` > 0 ? (<div className="text-green-500">+{parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevWeek.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevWeek.peggedUSD).toFixed(2)) * 100 ).toFixed(2)}%</div>) : (<div className="text-red-500">{parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevWeek.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevWeek.peggedUSD).toFixed(2)) * 100 ).toFixed(2)}%</div>)
                }
              </div>
              <div className="text-right">
              {
                  `${parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevMonth.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevMonth.peggedUSD).toFixed(2)) * 100 ).toFixed(2)}` > 0 ? (<div className="text-green-500">+{parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevMonth.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevMonth.peggedUSD).toFixed(2)) * 100 ).toFixed(2)}%</div>) : (<div className="text-red-500">{parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevMonth.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevMonth.peggedUSD).toFixed(2)) * 100 ).toFixed(2)}%</div>)
                }
              </div>
              <div className="text-right">
                {
                  `${commafy(parseFloat(stable.circulating.peggedUSD).toFixed(2))}`
                } $
              </div>


            </div>)
      ) : <Loader />}
      
    </div>
  )
}
export default StablesRanking
