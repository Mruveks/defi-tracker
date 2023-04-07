import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SearchList from "../../components/SearchList";
import { UnixConverter } from "../../utilities/UnixConverter";
import ChartObject from "../../components/charts/ChartObject";
import {
  ChartComponent,
  LineSeries,
  ColumnSeries,
  SeriesDirective,
  SeriesCollectionDirective,
  Inject,
  DataLabel,
  DateTime,
  Legend,
  Tooltip,
  Category,
} from "@syncfusion/ej2-react-charts";
import { Formatter } from "../../utilities/Formatter";

const ProtocolPage = () => {
  const { protocolId } = useParams(); // get the protocol ID from the URL params
  const [protocolData, setProtocolData] = useState([]);
  const [tvl, setTvl] = useState()
  let formattedProtocolId = protocolId.replace(/ /g, "-").toLowerCase();

  useEffect(() => {
    axios.get(`https://api.llama.fi/protocol/${formattedProtocolId}`)
      .then((res) => {
        const data = [res.data]; // convert the object to an array
        setProtocolData(data);
        const tvl = data[0].tvl;
        const lastElement = tvl[tvl.length - 1];
        setTvl(lastElement.totalLiquidityUSD)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [formattedProtocolId]);

  const primaryxAxis = { valueType: "Category", visible: false };
  const primaryyAxis = {
    visible: false,
    rangePadding: "Additional",
    labelFormat: "c2",
  };
  const legendSettings = { visible: true, textStyle: { color: "white" } };
  const tooltip = { enable: true };
  const palette = ["skyblue"];

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

  return (
    <main>
      <div className="mt-10 mx-10">
        <SearchList />
      </div>

      <div className="grid grid-cols-[30%_70%] h-96 mx-10 my-10 rounded-xl border border-gray-600">
        <div className="text-white p-4 italic capitalize">
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
                  {protocol.chain.length > 1 ? null : <p>{protocol.chains}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="chart" className="h-96 w-auto">
          <ChartComponent
            id="charts"
            primaryXAxis={primaryxAxis}
            primaryYAxis={primaryyAxis}
            palettes={palette}
            legendSettings={legendSettings}
            tooltip={tooltip}
            useGroupingSeparator={true}
          >
            <Inject
              services={[
                ColumnSeries,
                LineSeries,
                DataLabel,
                Category,
                DateTime,
                Tooltip,
              ]}
            />

            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={protocolData}
                xName="date"
                yName="totalLiquidityUSD"
                legendShape="Circle"
              />
            </SeriesCollectionDirective>
          </ChartComponent>
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
              {protocol.audit_links != 0 ? (
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
