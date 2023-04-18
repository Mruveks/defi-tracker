import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import axios from "axios";
import ChainsChart from "../../components/charts/ChainsChart";
import Ranking from "../../components/rankings/Ranking";
import ChainsSearchList from "../../components/ChainsSearchList";
import BackButton from "../../components/BackButton";
import moment from "moment";
import numeral from "numeral";

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
    <div className="grid grid-cols-1 text-md mx-10 sm:mx-5">
      <Helmet>
        <title>{`${
          chainId.charAt(0).toUpperCase() + chainId.slice(1)
        } | DeFi`}</title>
        <meta name="description" content={`${chainId}`} />
      </Helmet>

        <BackButton />
      <ChainsSearchList />

      <div className="flex justify-center items-center text-center capitalize text-white my-5 text-6xl italic">
        <header>{chainId}</header>
      </div>

      <div className="h-max text-white ">
        {chains.length ? (
          <div className="col-span-2 grid sm:grid-cols-1 grid-cols-[25%_75%] border border-gray-600 rounded-xl">
            <div className="grid gap-10 w-full text-4xl m-6 sm:m-0 sm:text-center  text-left">
              <div className="grid h-fit grid-flow-row w-full p-4">
                <div>Total Value Locked</div>
                <div className="text-blue-500">
                  {numeral(num2).format("$0.00a")}
                </div>
              </div>

              <div className="grid h-fit grid-flow-row w-full p-4">
                <div>24h Change</div>
                {percentageChange > 0 ? (
                  <div className="text-green-500">+{percentageChange}%</div>
                ) : (
                  <div className="text-red-500">{percentageChange}%</div>
                )}
                {dollarChange > 0 ? (
                  <div className="text-green-500">
                    {"+" + numeral(dollarChange).format("$0.00a")}
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

      <div className="h-max my-5 text-white">
        <Ranking chain={chainId} />
      </div>
    </div>
  );
};

export default ChainPage;
