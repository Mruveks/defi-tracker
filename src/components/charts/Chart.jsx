import React, { useState, useEffect } from "react";
import moment from "moment";
import numeral from "numeral";
import CustomTooltip from "./CustomTooltip";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Charts = ({ data }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLogScale, setIsLogScale] = useState(false);

  const toggleScale = () => {
    setIsLogScale(!isLogScale);
  };

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

  return (
    <>
      <div className="w-full h-full flex py-4">
        <ResponsiveContainer width="100%" height={500}>
          <LineChart margin={{ right: 20, left: 20, bottom: 40 }} data={data}>
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
      <div className="right-20 pt-4 absolute space-x-4 text-lg sm:hidden block">
        <button
          onClick={toggleScale}
          className={`rounded-lg px-2 transition duration-300 ${
            isLogScale === true ? "bg-gray-600" : "bg-transparent"
          }`}
        >
          Logarithmic
        </button>
        <button
          onClick={toggleScale}
          className={`rounded-lg px-2 transition duration-300 ${
            isLogScale === false ? "bg-gray-600" : "bg-gray-800"
          }`}
        >
          Linear
        </button>
      </div>
    </>
  );
};

export default Charts;
