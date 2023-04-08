import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import axios from "axios";
import ChainsChart from "../../components/charts/ChainsChart";
import Ranking from "../../components/rankings/Ranking";
import ChainsSearchList from "../../components/ChainsSearchList";
import numeral from "numeral";
import moment from 'moment'

const ChainPage = () => {
  const { chainId } = useParams();
  const [chains, setChains] = useState([]);

  const [lastDay, setLastDay] = useState();
  const [day, setDay] = useState();

  let formattedProtocolId = chainId;
  console.log(chainId);

  useEffect(() => {
    axios
      .get(`https://api.llama.fi/charts/${formattedProtocolId}`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        const dates = data.map((item) => moment.unix(item.date).toDate());
        const values = data.map((item) => item.totalLiquidityUSD);
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

  const num1 = parseFloat(day).toFixed(2);
  const num2 = parseFloat(lastDay).toFixed(2);
  const dollarChange = (num1 - num2).toFixed(2);
  const percentageChange = (((num1 - num2) / num2) * 100).toFixed(2);

  return (
    <div className="grid grid-cols-1 w-full text-md">
      <Helmet>
        <title>{`${chainId} | DeFi`}</title>
        <meta name="description" content={`${chainId}`} />
      </Helmet>

      <div className="mx-10">
        <ChainsSearchList />
      </div>

      <div className="text-center capitalize text-white my-5 text-4xl italic">
        {chainId}
      </div>

      <div className="h-max mx-10 text-white ">
        {chains.length ? (
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col w-full lg:w-[30%] gap-4 lg:gap-8 lg:py-2 lg:pr-2 text-4xl text-left">
              <div className="flex sm:flex-row lg:flex-col justify-evenly border border-gray-600 w-full h-full lg:py-10 py-2 px-4 rounded-xl md:items-center lg:items-start">
                <div>Total Value Locked</div>
                <div className="text-blue-500">
                  {numeral(num2).format("$0.00a")}
                </div>
              </div>

              <div className="flex sm:flex-row lg:flex-col justify-evenly border border-gray-600 w-full h-full lg:py-10 py-2 px-4 rounded-xl md:items-center lg:items-start">
                <div>24h Change</div>
                {percentageChange > 0 ? (
                  <div className="text-green-500">+{percentageChange}%</div>
                ) : (
                  <div className="text-red-500">{percentageChange}%</div>
                )}
                {dollarChange > 0 ? (
                  <div className="text-green-500">
                    {numeral(dollarChange).format("$0.00a")}
                  </div>
                ) : (
                  <div className="text-red-500">
                    {numeral(dollarChange).format("$0.00a")}
                  </div>
                )}
              </div>
            </div>
            <ChainsChart />
          </div>
        ) : null}
      </div>

      <header className="flex justify-center w-full my-5 text-white text-3xl">
        Top protocols from{" "}
        <h1 className="italic px-2 capitalize"> {chainId} </h1> ecosystem
      </header>
      <Ranking chain={chainId} />
    </div>
  );
};

export default ChainPage;
