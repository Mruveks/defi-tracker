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
  AreaChart,
  Brush,
  Area,
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

  const dataWithDateObjects = data.map((item) => ({
    ...item,
    date: new Date(item.date),
  }));

  const [activeIndex, setActiveIndex] = useState(
    dataWithDateObjects.length - 1
  );

  useEffect(() => {
    setActiveIndex(dataWithDateObjects.length - 1);
  }, []);
  function formatDate(dateStr) {
    if (!dateStr) {
      return "";
    }
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  return (
    <>
      <ResponsiveContainer
        width="100%"
        className="m-4"
        height={isSmallScreen ? 200 : 500}
      >
        <LineChart data={dataWithDateObjects}>
          <CartesianGrid
            vertical={true}
            strokeOpacity={0.1}
            horizontal={true}
          />
          {isSmallScreen ? null : (
            <XAxis
              label={{ value: "Date", position: "Center", angle: -360 }}
              dataKey="date"
              axisLine={false}
              tickLine={false}
              interval={365}
              tickFormatter={(value) => moment(value).format("MMM, YYYY")}
              stroke="gray"
              tickSize={2}
              tick={{
                dx:8,
                dy: -18,
                fontSize: 14,
                textAnchor: "start",
              }}
            />
          )}
          {isSmallScreen ? null : (
            <YAxis
              label={{ value: "Value", position: "Center", angle: -90 }}
              axisLine={false}
              tickLine={false}
              fontFamily="font-mono"
              stroke="gray"
              tickFormatter={(value) => numeral(value).format("$0.00a")}
              tickSize={2}
              tick={{
                color: "blue",
                dx: 12,
                dy: 8,
                fontSize: 14,
                textAnchor: "start",
              }}
              padding={{ top: 80, bottom: 40 }}
              scale={isLogScale ? "log" : "linear"}
              domain={isLogScale ? ["auto", "auto"] : [0, "auto"]}
            />
          )}
          <Tooltip
            active={activeIndex !== -1}
            width="100%"
            activeIndex={activeIndex}
            content={<CustomTooltip />}
            margin={(isSmallScreen ? { top: 12 } : { top: 20 }, { bottom: 20 })}
            position={isSmallScreen ? { x: 0, y: -20 } : { x: 70, y: 4 }}
          />
          <Line dot={false} type="monotone" dataKey="value" stroke="#8884d8" />

          <Brush
            margin={{ top: 20, bottom: 20 }}
            height={40}
            padding={{ bottom: 4, top: 4 }}
            dataKey="date"
            tickFormatter={formatDate}
            stroke="#8884d8"
            travellerWidth={10}
            startIndex={data.length[0]}
            fill="#222f3e"
          >
            <AreaChart margin={{ top: 20, bottom: 20 }}>
              <CartesianGrid strokeOpacity={0.05} />
              <YAxis hide={true} stroke="transparent" domain={[0, "dataMin"]} />
              <Area
                dataKey="value"
                margin={{ top: 20, bottom: 20 }}
                stroke="#8884d8"
                fill="transparent"
              />
            </AreaChart>
          </Brush>
        </LineChart>
      </ResponsiveContainer>

      <div className="right-16 pt-6 absolute space-x-4 text-lg sm:hidden block">
        <button
          onClick={toggleScale}
          className={`rounded-lg px-2 transition duration-300 ${
            isLogScale === true ? "text-[#8884d8]" : "text-gray-600"
          }`}
        >
          Logarithmic
        </button>
        <button
          onClick={toggleScale}
          className={`rounded-lg px-2 transition duration-300 ${
            isLogScale === false ? "text-[#8884d8] " : "text-gray-600"
          }`}
        >
          Linear
        </button>
      </div>
    </>
  );
};
export default Charts;
