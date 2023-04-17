import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import Loader from "../Loader";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Chart = () => {
  const { chainId } = useParams();
  const [formattedData, setFormattedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogarithmic, setIsLogarithmic] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.llama.fi/charts/${chainId
          .replace(/ /g, "-")
          .toLowerCase()}`
      )
      .then((res) => {
        const data = [res.data];
        const formattedData = data[0].map((item) => {
          return {
            date: moment.unix(item.date).toDate(),
            value: Number(item.totalLiquidityUSD),
          };
        });
        setFormattedData(formattedData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [chainId]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
      const formattedLabel = moment(label).format("DD/MM/YYYY");
      const formattedValue = numeral(payload[0].value).format("$0,0");
      return (
        <div className="bg-transparent text-2xl border border-none p-2">
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
    const tickIndex = payload.index;
    const shouldDisplayTick = tickIndex % 6 === 0; // display tick every 6 months

    if (!shouldDisplayTick) {
      return null;
    }

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

  return (
    <div className="w-full h-full flex mx-auto py-4">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          width={1200}
          height={600}
          margin={{ right: 20, left: 20, bottom: 40 }}
          data={formattedData}
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
          <Line dot={false} type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <button onClick={toggleScale} className="right-20 absolute text-lg">
        {isLogScale ? "Logarithmic" : "Linear"}
      </button>
    </div>
  );
};

export default Chart;
