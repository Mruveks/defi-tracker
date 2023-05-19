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
  const [weekAgo, setWeekAgo] = useState();

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
        const weekAgoValue = datasource.slice(
          datasource.length - 8,
          datasource.length - 7
        );
        setLastDay(yesterday[0].value);
        setDay(today[0].value);
        setWeekAgo(weekAgoValue[0].value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [chainId]);

  const changes = day - lastDay;
  const percentageChange = (((day - lastDay) / lastDay) * 100).toFixed(2);
  const changes_7 = day - weekAgo;
  const percentageChange_7 = (((day - weekAgo) / weekAgo) * 100).toFixed(2);

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
            <div className="space-y-8 h-fit text-white sm:w-full text-2xl p-4 italic capitalize">
              <div className="col-span-2 my-4 flex items-center not-italic sm:space-x-0 text-2xl space-x-4 w-[110%]">
                <header className="whitespace-pre-wrap flex">{chainId}</header>
              </div>
              <div className="grid h-fit grid-flow-row w-fit justify-center py-4">
                <div>Total Value Locked</div>
                <div className="text-blue-500 font-mono">
                  {numeral(day).format("$0.00a")}
                </div>
              </div>

              <div className="grid h-fit grid-flow-row w-full pb-4">
                <div>24h Change</div>
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
              <div className="grid h-fit grid-flow-row w-full pb-4">
                <div>7 day Change</div>
                {percentageChange_7 > 0 ? (
                  <div className="text-green-500 font-mono">
                    +{percentageChange_7}%
                  </div>
                ) : (
                  <div className="text-red-500 font-mono">
                    {percentageChange_7}%
                  </div>
                )}
                {changes_7 > 0 ? (
                  <div className="text-green-500 font-mono">
                    {"+" + numeral(changes_7).format("$0.00a")}
                  </div>
                ) : (
                  <div className="text-red-500 font-mono">
                    {numeral(changes_7).format("$0.00a")}
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
