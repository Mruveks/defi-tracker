import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import numeral from "numeral";
import moment from "moment";
import Charts from "./Chart";
const TVLchart = () => {
  const [protocols, setProtocols] = useState([]);
  const [lastDay, setLastDay] = useState();
  const [day, setDay] = useState();

  useEffect(() => {
    axios
      .get("https://api.llama.fi/charts")
      .then((res) => {
        const data = res.data;
        const dates = data.map((item) => moment.unix(item.date).toDate());
        const values = data.map((item) => item.totalLiquidityUSD);
        const datasource = values.map((value, index) => ({
          date: dates[index],
          value: value,
        }));
        setProtocols(datasource);
        console.log(protocols);
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
  }, []);

  const num1 = parseFloat(day).toFixed(2);
  const num2 = parseFloat(lastDay).toFixed(2);
  const dollarChange = (num1 - num2).toFixed(2);
  const percentageChange = (((num1 - num2) / num2) * 100).toFixed(2);

  return (
    <>
      {protocols.length ? (
        <div className="flex flex-col lg:flex-row ">
          <div className=" grid sm:grid-cols-1 grid-cols-[25%_75%] border border-gray-600 rounded-xl">
            
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

            <div className="w-full h-full justify-end flex py-4">
              <Charts data={protocols} />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default TVLchart;
