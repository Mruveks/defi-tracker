import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Line,
} from "recharts";
import numeral from "numeral";

const formatValue = (value) => numeral(value).format("$0.00a");

const Charts = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const colors = [
    "#8884d8",
    "#b486c7",
    "#7cbfcf",
    "#95ca98",
    "#e4b77d",
    "#e68e9d",
    "#7eaedf",
    "#ff8c77",
    "#a893cc",
    "#c7d48d",
  ];
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleMouseEnter = (data, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(-1);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1100px)");

    const handleMediaQueryChange = (e) => {
      setIsSmallScreen(e.matches);
    };

    handleMediaQueryChange(mediaQuery);
    mediaQuery.addListener(handleMediaQueryChange);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  return (
    <ResponsiveContainer className="m-auto" height={isSmallScreen ? 300 : 600}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="chain"
          cx="50%"
          cy="50%"
          outerRadius={isSmallScreen ? 100 : 200}
          fill="#8884d8"
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            value,
            index,
          }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            if (
              (isSmallScreen ? index > 0 : index > 2) &&
              index !== activeIndex
            ) {
              return null;
            }

            return (
              <text
                x={x}
                y={y}
                fill="#fff"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                className={isSmallScreen ? "" : "text-lg"}
              >
                {isSmallScreen ? (
                  <>
                    <tspan x={x} dy={-10}>
                      {data[index].chain}
                    </tspan>
                    <tspan x={x} dy={20} className="font-mono">
                      {formatValue(value)}
                    </tspan>
                  </>
                ) : (
                  <>
                    {data[index].chain} -{" "}
                    <tspan className="font-mono"> {formatValue(value)}</tspan>
                  </>
                )}
              </text>
            );
          }}
          labelLine={0}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animationDuration={500}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Charts;
