import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SearchList from "../../components/SearchList";
import { Formatter } from "../../utilities/Formatter";
import { UnixConverter } from "../../utilities/UnixConverter";
import { Helmet } from "react-helmet";
import moment from "moment";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import numeral from "numeral";

const ProtocolPage = () => {
  const { protocolId } = useParams(); // get the protocol ID from the URL params
  const [protocolData, setProtocolData] = useState([]);
  const [tvl, setTvl] = useState();
  const [formattedData, setChartData] = useState([]);
  let formattedProtocolId = protocolId.replace(/ /g, "-").toLowerCase();

  useEffect(() => {
    axios
      .get(`https://api.llama.fi/protocol/${formattedProtocolId}`)
      .then((res) => {
        const data = [res.data];
        setProtocolData(data);
        const tvl = data[0].tvl;
        const lastElement = tvl[tvl.length - 1];
        setTvl(lastElement.totalLiquidityUSD);

        const formattedData = tvl.map((item) => {
          return {
            date: moment.unix(item.date).toDate(),
            value: Number(item.totalLiquidityUSD),
          };
        });
        setChartData(formattedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [formattedProtocolId]);

  const renderRaises = (raise) => (
    <div key={raise.name}>
      <p>Total Raised: ${raise.amount}m</p>
      <p>
        {raise.date}: {raise.round} - Raised ${raise.amount}m
      </p>
    </div>
  );

  const renderInvestors = (investors) => (
    <div className="grid grid-cols-6 py-4 gap-4 text-lg text-gray-400 italic">
      {investors.map((investor) => (
        <div key={investor} className="w-full hover:underline cursor-pointer">
          {investor}
        </div>
      ))}
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      const formattedLabel = moment(label).format("DD/MM/YYYY");
      const formattedValue = numeral(payload[0].value).format("$0,0");
      return (
        <div className="bg-transparent  text-2xl border border-none">
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
  

  return (
    <main>
      <Helmet>
        <title>{protocolId} | DeFi</title>
        <meta
          name="description"
          content={`Learn more about ${protocolId} features and how it works on our website.`}
        />
      </Helmet>

      <div className="mt-10 mx-10">
        <SearchList />
      </div>

      <div className="grid grid-cols-[30%_70%] mx-10 my-10 rounded-xl">
        <div className="col-span-2 grid grid-cols-[30%_70%] border border-gray-600">
          <div className="text-white p-4 italic capitalize ">
            <div>
              {protocolData.map((protocol) => (
                <div key={protocol.id} className="space-y-4">
                  <header className="text-3xl">
                    {protocolId}({protocol.symbol})
                  </header>
                  <div>
                    <h1>Total Value Locked</h1>
                    <p>{tvl}$</p>
                  </div>
                  <div>
                    <p>Chain breakdown</p>
                    <p>{protocol.chain}</p>
                    {protocol.chain.length > 1 ? null : (
                      <p>{protocol.chains}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-full justify-end flex py-4">
            <LineChart width={1000} height={500} margin={{right: 10, bottom: 40 }} data={formattedData}>
              <CartesianGrid
                vertical={false}
                horizontal={false}
              />
              <XAxis
                dataKey="date"
                interval={10}
                tick={<CustomizedAxisTick />}
                stroke="gray"
              />
              <YAxis
                stroke="gray"
                tickFormatter={(value) => numeral(value).format("$0.00a")}
                padding={{ top: 100 }}
              />
              <Tooltip
                active={true}
                content={<CustomTooltip />}
                position={{ x: 80, y: 2 }}
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

        <header className="mt-10 mb-2 text-2xl">Protocol Infromation</header>

        <div className="col-span-2 p-4 w-full rounded-xl border border-gray-600">
          {protocolData.map((protocol) => (
            <div key={protocol.id} className="space-y-4">
              <p className="text-justify">{protocol.description}</p>
              <p>Category: {protocol.category}</p>
              <p>
                Created at: <UnixConverter date={protocol.listedAt} />
              </p>
              <h2>Audits:</h2>
              {protocol.audit_links > 0 ? (
                <div>
                  {protocol.audit_links.map((audits) => (
                    <div>{audits}</div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <header className="mt-10 mb-2 text-2xl">Token Information</header>
        <div className="col-span-2 p-4 w-full rounded-xl border border-gray-600">
          {protocolData.map((protocol) => (
            <div key={protocol.id} className="space-y-4">
              <p>Address {protocol.address}</p>
              <div className="flex space-x-4">
                <p>
                  <a
                    href={`https:/www.coingecko.com/en/coins/${protocol.gecko_id}`}
                    target="__blank"
                    className="px-4 py-2 rounded bg-gray-900 w-fit hover:bg-gray-600"
                  >
                    View on CoinGecko
                  </a>
                </p>
                <p>
                  <a
                    href=""
                    className="px-4 py-2 rounded bg-gray-900 w-fit hover:bg-gray-600"
                  >
                    view on blockchain
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
        {protocolData.map((protocol) => (
          <div key={protocol.id} className="col-span-2">
            <header className="mt-10 mb-2 text-2xl">Raises</header>
            <div className="col-span-2 p-4 rounded-xl border border-gray-600">
              <div className="space-y-4">
                {protocol.raises.map(renderRaises)}
              </div>
            </div>
            <header className="mt-10 mb-2 text-2xl">Lead Investors</header>
            <div className="col-span-2 p-4 w-full rounded-xl border border-gray-600">
              {protocol.raises.map((raise) => (
                <div key={raise.name}>
                  {renderInvestors(raise.leadInvestors)}
                </div>
              ))}
            </div>
            <header className="mt-10 mb-2 text-2xl">Other Investors</header>
            <div className="col-span-2 mb-10 p-4 w-full rounded-xl border border-gray-600">
              {protocol.raises.map((raise) => (
                <div key={raise.name}>
                  {renderInvestors(raise.otherInvestors)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProtocolPage;
