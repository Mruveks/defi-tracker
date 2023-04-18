import React, { useEffect, useState } from "react";
import axios from "axios";

import Loader from "../Loader";
import numeral from "numeral";
import CalculateChange from "../../utilities/CalculateChange";

const StablesRanking = () => {
  const [stables, setStables] = useState([]);

  useEffect(() => {
    axios
      .get("https://stablecoins.llama.fi/stablecoins?includePrices=true")
      .then((res) => {
        setStables(res.data.peggedAssets);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="h-max mb-8 border-gray-600 p-2 border rounded-xl bg-gray-800 ">
        <div className="grid sm:grid-cols-3 grid-cols-7 font-semibold p-2 text-lg sm:text-sm text-right capitalize italic">
          <header className="text-left">Name</header>
          <header>Price</header>
          <header className="sm:hidden block">Peg Mechanism</header>
          <header className="sm:hidden block">1d Change</header>
          <header className="sm:hidden block">7d Change</header>
          <header className="sm:hidden block">1m Change</header>
          <header>MarketCap</header>
        </div>

        {stables.length ? (
          stables
            .filter(
              (item) =>
                (item.circulating.peggedUSD >= 1000000 ||
                  item.circulating.peggedEUR >= 1000000 ||
                  item.circulating.peggedVAR >= 1000000) &&
                item.price != null
            )
            .map((stable, index) => (
              <div
                className={` ${
                  index % 2 === 0 ? "bg-[#222f3e]" : "bg-gray-800"
                } grid sm:grid-cols-3 grid-cols-7 items-center rounded-xl p-2 text-right`}
                key={index}
              >
                <a
                  href={`https://www.coingecko.com/en/coins/${stable.gecko_id}`}
                  target="_blank"
                  className="flex items-center space-x-4 p-2 text-left hover:bg-gray-600 transition duration-300 rounded-xl"
                >
                  <div className="w-6">{index}</div>
                  <div className=" text-blue-400">
                    {stable.name} ({stable.symbol})
                  </div>
                </a>

                {stable.price >= 1 ? (
                  <div className="text-green-500">
                    {parseFloat(stable.price).toFixed(2)}$
                  </div>
                ) : (
                  <div className="text-red-500">
                    {parseFloat(stable.price).toFixed(2)}$
                  </div>
                )}

                <div className="sm:hidden block">{stable.pegMechanism}</div>

                {/* CALCULATING DAILY CHANGE */}
                {stable.circulating.peggedEUR ? (
                  stable.circulatingPrevDay.peggedEUR ? (
                    <div className="sm:hidden block">
                      <CalculateChange
                        lastDay={stable.circulating.peggedEUR}
                        today={stable.circulatingPrevDay.peggedEUR}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )
                ) : null}

                {stable.circulating.peggedUSD ? (
                  stable.circulatingPrevDay.peggedUSD ? (
                    <div className="sm:hidden block">
                      <CalculateChange
                        lastDay={stable.circulating.peggedUSD}
                        today={stable.circulatingPrevDay.peggedUSD}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )
                ) : null}

                {stable.circulating.peggedVAR ? (
                  stable.circulatingPrevDay.peggedVAR ? (
                    <div className="sm:hidden block">
                      <CalculateChange
                        lastDay={stable.circulating.peggedVAR}
                        today={stable.circulatingPrevDay.peggedVAR}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )
                ) : null}

                {/* CALCULATING WEEKLY CHANGE */}
                {stable.circulating.peggedEUR ? (
                  stable.circulatingPrevWeek.peggedEUR ? (
                    <div className="sm:hidden block">
                      <CalculateChange
                        lastDay={stable.circulating.peggedEUR}
                        today={stable.circulatingPrevWeek.peggedEUR}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )
                ) : null}

                {stable.circulating.peggedUSD ? (
                  stable.circulatingPrevWeek.peggedUSD ? (
                    <div className="sm:hidden block">
                      <CalculateChange
                        lastDay={stable.circulating.peggedUSD}
                        today={stable.circulatingPrevWeek.peggedUSD}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )
                ) : null}

                {stable.circulating.peggedVAR ? (
                  stable.circulatingPrevWeek.peggedVAR ? (
                    <div className="sm:hidden block">
                      <CalculateChange
                        lastDay={stable.circulating.peggedVAR}
                        today={stable.circulatingPrevWeek.peggedVAR}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )
                ) : null}

                {/* CALCULATING MONTHLY CHANGE */}
                {stable.circulating.peggedEUR ? (
                  stable.circulatingPrevMonth.peggedEUR ? (
                    <div className="sm:hidden block">
                      <CalculateChange
                        lastDay={stable.circulating.peggedEUR}
                        today={stable.circulatingPrevMonth.peggedEUR}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )
                ) : null}

                {stable.circulating.peggedUSD ? (
                  stable.circulatingPrevMonth.peggedUSD ? (
                    <div className="sm:hidden block">
                      <CalculateChange
                        lastDay={stable.circulating.peggedUSD}
                        today={stable.circulatingPrevMonth.peggedUSD}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )
                ) : null}

                {stable.circulating.peggedVAR ? (
                  stable.circulatingPrevMonth.peggedVAR ? (
                    <div className="sm:hidden block">
                      <CalculateChange
                        lastDay={stable.circulating.peggedVAR}
                        today={stable.circulatingPrevMonth.peggedVAR}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )
                ) : null}

                {stable.circulating.peggedUSD
                  ? numeral(stable.circulating.peggedUSD).format("$0.00a")
                  : null}
                {stable.circulating.peggedEUR
                  ? numeral(stable.circulating.peggedEUR * 1.08).format(
                      "$0.00a"
                    )
                  : null}
                {stable.circulating.peggedVAR
                  ? numeral(stable.circulating.peggedVAR).format("$0.00a")
                  : null}
              </div>
            ))
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};
export default StablesRanking;
