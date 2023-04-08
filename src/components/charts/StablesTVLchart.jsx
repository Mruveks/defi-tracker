import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import numeral from "numeral";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const StablesTVLchart = () => {

  const [stable, setStables] = useState([]);
  const [lastDay, setLastDay] = useState();
  const [day, setDay] = useState();

  useEffect(() => {
    axios.get('https://stablecoins.llama.fi/stablecoincharts/all?stablecoin=1')
      .then(res => {
        const stables = res.data;
        const dates = stables.map(item => moment.unix(item.date).toDate());        
        const totalCirculating = stables.map(item => item.totalCirculatingUSD);
        const totalPegged = totalCirculating.map(item => item.peggedUSD);
        const datasource = totalPegged.map((value, index) => ({ date: dates[index], value }));

        setStables(datasource);
        
        setLastDay(datasource[767].value)
        setDay(datasource[768].value)
      })
      .catch(err => {
        console.log(err)
      });
  }, []);

  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
      // add a check for payload
      const formattedLabel = moment(label).format("DD/MM/YYYY");
      const formattedValue = numeral(payload[0].value).format("$0,0");
      return (
        <div className="bg-transparent  text-2xl border border-none p-2">
          <p>Total TVL</p>
          <p className="text-xl italic font-semibold">{formattedValue}</p>
          <p className="text-base font-semibold">{formattedLabel}</p>
        </div>
      );
    }
    return null;
  };

  const CustomizedAxisTick = ({ x, y, payload }) => {
    const formattedDate = moment(payload.value).format("DD/MM/YYYY");
    
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="gray"
          transform="rotate(-35)"
        >
          {formattedDate}
        </text>
      </g>
    );
  };
  
  
  const num1 = parseFloat(day).toFixed(2)
  const num2 = parseFloat(lastDay).toFixed(2)

  const dollarChange = (num1 - num2).toFixed(2)
  const percentageChange = (((num1 - num2) / num2) * 100).toFixed(2)

  return (
    <>
      {stable.length ? (
        <div className="flex flex-col lg:flex-row ">
          <div className="flex flex-col w-full lg:w-[30%] gap-4 lg:gap-8 lg:py-2 lg:pr-2 text-4xl text-left">
            <div className="flex sm:flex-row lg:flex-col justify-evenly border border-gray-600 w-full h-full lg:py-10 py-2 px-4 rounded-xl md:items-center lg:items-start">
              <div>Total Value Locked</div>
              <div className="text-blue-500">{numeral(num2).format("$0.00a")}</div>
            </div>

            <div className="flex sm:flex-row lg:flex-col justify-evenly border border-gray-600 w-full h-full lg:py-10 py-2 px-4 rounded-xl md:items-center lg:items-start">
              <div>24h Change</div>
              {percentageChange > 0 ? (
                <div className="text-green-500">+{percentageChange}%</div>
              ) : (
                <div className="text-red-500">{percentageChange + "%"}</div>
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

          <div className="resize lg:w-[70%] my-2 rounded-xl border border-gray-600">
            <LineChart
              width={900}
              height={500}
              margin={{ right: 20, left: 20, bottom: 40 }}
              data={stable}
            >
              <CartesianGrid vertical={false} horizontal={false} />
              <XAxis
                
                dataKey="date"
                interval={100}
                tick={<CustomizedAxisTick />}
                stroke="gray"
              />
              <YAxis
                stroke="gray"
                tickFormatter={(value) => numeral(value).format("$0.00a")}
                padding={{ top: 100, bottom: 40 }}
              />
              <Tooltip
                active={true}
                content={<CustomTooltip />}
                position={{ x: 100, y: 2 }}
                contentStyle={{ color: "gray" }}
                stroke="gray"
              />
              <Line
                dot={false}
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
              />
            </LineChart>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default StablesTVLchart

