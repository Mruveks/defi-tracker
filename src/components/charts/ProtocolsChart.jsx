import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Chart = () => {
  const { protocolId } = useParams(); // get the protocol ID from the URL params
  const [formattedData, setFormattedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    const handleMediaQueryChange = (e) => {
      setIsSmallScreen(e.matches);
    };

    handleMediaQueryChange(mediaQuery);
    mediaQuery.addListener(handleMediaQueryChange);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.llama.fi/protocol/${protocolId
          .replace(/ /g, "-")
          .toLowerCase()}`
      )
      .then((res) => {
        const data = [res.data];
        const formattedData = data[0].tvl.map((item) => {
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
  }, [protocolId]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
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
    <div className="w-full sm:hidden h-full justify-end flex py-4">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          margin={{ right: 20, left: 20, bottom: 40 }}
          data={formattedData}
        >
          <CartesianGrid
            vertical={true}
            strokeOpacity={0.05}
            horizontal={true}
          />
          {isSmallScreen ? null : (
            <XAxis
              dataKey="date"
              interval={182}
              tick={<CustomizedAxisTick />}
              padding={{ top: 80, }}
              stroke="gray"
              label={{
                value: "Date",
                position: "insideBottomRight",
                offset: 0,
              }}
            />
          )}
          {isSmallScreen ? null : (
            <YAxis
              stroke="gray"
              tickFormatter={(value) => numeral(value).format("$0.00a")}
              padding={{ top: 80, bottom: 40 }}
              scale={isLogScale ? "log" : "linear"}
              domain={isLogScale ? ["auto", "auto"] : [0, "auto"]}
              label={{
                value: "Value",
                position: "insideTopLeft",
              }}
            />
          )}
          <Tooltip
            active={true}
            content={<CustomTooltip />}
            position={isSmallScreen ? { x: 20, y: 2 } : { x: 100, y: 2 }}
            contentStyle={{ color: "gray" }}
            stroke="gray"
          />
          <Line dot={false} type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <div className="right-20 absolute space-x-4 text-lg">
        <button
          onClick={toggleScale}
          className={`rounded-full px-2 transition duration-300 ${
            isLogScale === true ? "bg-gray-600" : "bg-transparent"
          }`}
        >
          Logarithmic
        </button>
        <button
          onClick={toggleScale}
          className={`rounded-full px-2 transition duration-300 ${
            isLogScale === false ? "bg-gray-600" : "bg-gray-800"
          }`}
        >
          Linear
        </button>
      </div>
    </div>
  );
};

export default Chart;
