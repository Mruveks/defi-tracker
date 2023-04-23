import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import numeral from "numeral";
import moment from "moment";
import Charts from "./Chart";

const StablesTVLchart = () => {
  const [stable, setStables] = useState([]);
  const [lastDay, setLastDay] = useState();
  const [day, setDay] = useState();

  useEffect(() => {
    axios
      .get("https://stablecoins.llama.fi/stablecoincharts/all?stablecoin=1")
      .then((res) => {
        const stables = res.data;
        const dates = stables.map((item) => moment.unix(item.date).toDate());
        const totalCirculating = stables.map(
          (item) => item.totalCirculatingUSD
        );
        const totalPegged = totalCirculating.map((item) => item.peggedUSD);
        const datasource = totalPegged.map((value, index) => ({
          date: dates[index],
          value,
        }));

        setStables(datasource);

        setLastDay(datasource[767].value);
        setDay(datasource[768].value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const num1 = parseFloat(day).toFixed(2);
  const num2 = parseFloat(lastDay).toFixed(2);

  const dollarChange = (num1 - num2).toFixed(2);
  const percentageChange = (((num1 - num2) / num2) * 100).toFixed(2);

  return (
    <>
      {stable.length ? (
        <div className="grid sm:grid-cols-1 grid-cols-[25%_75%] border border-gray-600 rounded-xl">
          <div className="grid gap-10 w-full text-4xl m-6 sm:m-0 sm:text-center text-left">
            <div className="grid h-fit grid-flow-row w-full py-4">
              <div>Total Value Locked</div>
              <div className="text-blue-500 font-mono">
                {numeral(num2).format("$0.00a")}
              </div>
            </div>

            <div className="grid h-fit grid-flow-row w-full py-4">
              <div>24h Change</div>
              {percentageChange > 0 ? (
                <div className="text-green-500 font-mono">+{percentageChange}%</div>
              ) : (
                <div className="text-red-500 font-mono">{percentageChange}%</div>
              )}
              {dollarChange > 0 ? (
                <div className="text-green-500 font-mono">
                  {"+" + numeral(dollarChange).format("$0.00a")}
                </div>
              ) : (
                <div className="text-red-500 font-mono">
                  {numeral(dollarChange).format("$0.00a")}
                </div>
              )}
            </div>
          </div>

          <div className="flex py-4">
            <Charts data={stable} />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default StablesTVLchart;
