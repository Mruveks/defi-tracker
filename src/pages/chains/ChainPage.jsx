import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import axios from "axios";
import ChainsChart from "../../components/charts/ChainsChart";
import Ranking from "../../components/rankings/Ranking";
import SearchList from "../../components/SearchList";
import BackButton from "../../components/BackButton";
import moment from "moment";
import numeral from "numeral";

const ChainPage = () => {
  const { chainId } = useParams();
  const [chains, setChains] = useState([]);
  const [lastDay, setLastDay] = useState();
  const [day, setDay] = useState();

  useEffect(() => {
    axios
      .get(`https://api.llama.fi/v2/historicalChainTvl/${chainId}`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        const dates = data.map((item) => moment.unix(item.date).toDate());
        const values = data.map((item) => item.tvl);
        const datasource = values.map((value, index) => ({
          date: dates[index],
          value: value,
        }));
        setChains(datasource);
        console.log(chains);
        const today = datasource.slice(
          datasource.length - 1,
          datasource.length
        );
        const yesterday = datasource.slice(
          datasource.length - 2,
          datasource.length - 1
        );

        setLastDay(yesterday[0].value);
        setDay(today[0].value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [chainId]);

  const changes = day - lastDay;
  const percentageChange = (((day - lastDay) / lastDay) * 100).toFixed(2);

  return (
    <div className="grid grid-cols-1 text-md mx-10 sm:mx-5">
      <Helmet>
        <title>{`${
          chainId.charAt(0).toUpperCase() + chainId.slice(1)
        } | DefiTracker`}</title>
        <meta name="description" content={`${chainId}`} />
      </Helmet>

      <BackButton />
      <SearchList />

      <div className="h-max text-white ">
        {chains.length ? (
          <div className="col-span-2 mt-4 grid sm:grid-cols-1 grid-cols-[25%_75%] border border-gray-600 rounded-xl">
            <div className="grid gap-10 w-full text-4xl m-6 sm:m-0 sm:text-center items-center text-left">
              <div className="pt-4 capitalize">
                <header className="">{chainId}</header>
              </div>
              <div className="grid h-fit grid-flow-row w-full py-4">
                <h1>Total Value Locked</h1>
                <div className="text-blue-500 font-mono">
                  {numeral(day).format("$0.00a")}
                </div>
              </div>

              <div className="grid h-fit grid-flow-row w-full pb-4">
                <h1>24h Change</h1>
                {percentageChange > 0 ? (
                  <div className="text-green-500 font-mono">
                    +{percentageChange}%
                  </div>
                ) : (
                  <div className="text-red-500 font-mono">
                    {percentageChange}%
                  </div>
                )}
                {changes > 0 ? (
                  <div className="text-green-500 font-mono">
                    {"+" + numeral(changes).format("$0.00a")}
                  </div>
                ) : (
                  <div className="text-red-500 font-mono">
                    {numeral(changes).format("$0.00a")}
                  </div>
                )}
              </div>
            </div>
            <ChainsChart />
          </div>
        ) : null}
      </div>

      <div className="h-max my-4 text-white">
        <Ranking chain={chainId} />
      </div>
    </div>
  );
};

export default ChainPage;
