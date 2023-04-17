import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import numeral from "numeral";
import moment from "moment";
import {
  LineChart,
  ResponsiveContainer,
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

  const [isLogScale, setIsLogScale] = useState(false);

  const toggleScale = () => {
    setIsLogScale(!isLogScale);
  };

  const num1 = parseFloat(day).toFixed(2);
  const num2 = parseFloat(lastDay).toFixed(2);

  const dollarChange = (num1 - num2).toFixed(2);
  const percentageChange = (((num1 - num2) / num2) * 100).toFixed(2);

  return (
    <>
      {stable.length ? (
        <div className="grid sm:grid-cols-1 grid-cols-[25%_75%] border border-gray-600 rounded-xl">
          <div className="grid gap-10 w-full text-4xl m-6  text-left">
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

          <div className="w-full sm:hidden h-full justify-end flex py-4">
            <ResponsiveContainer width="100%" height={500}>
              <LineChart
                margin={{ right: 20, left: 20, bottom: 40 }}
                data={stable}
              >
                <CartesianGrid
                  vertical={true}
                  strokeOpacity={0.05}
                  horizontal={true}
                />
                <XAxis
                  dataKey="date"
                  interval={182}
                  tick={<CustomizedAxisTick />}
                  stroke="gray"
                  label={{ value: 'Date', position: 'insideBottomRight', offset: 0 }}
                />
                <YAxis
                  stroke="gray"
                  tickFormatter={(value) => numeral(value).format("$0.00a")}
                  padding={{ top: 100, bottom: 40 }}
                  scale={isLogScale ? "log" : "linear"}
                  domain={isLogScale ? ["auto", "auto"] : [0, "auto"]}
                  label={{ value: 'Value', position: 'insideTopLeft', }}
                />
                <Tooltip
                  active={true}
                  content={<CustomTooltip />}
                  position={{ x: 100, y: 2 }}
                />
                <Line
                  dot={false}
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <button onClick={toggleScale} className="right-20 pt-4 absolute text-lg">
            {isLogScale ? "Logarithmic" : "Linear"}
          </button>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default StablesTVLchart;
