import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SearchList from "../../components/SearchList";
import { UnixConverter } from "../../utilities/UnixConverter";
import { Helmet } from "react-helmet";
import Chart from "../../components/Chart";
import numeral from "numeral";

const ProtocolPage = () => {
  const { protocolId } = useParams(); // get the protocol ID from the URL params
  const [protocolData, setProtocolData] = useState([]);
  const [tvl, setTvl] = useState();
  let formattedProtocolId = protocolId.replace(/ /g, "-").toLowerCase();

  useEffect(() => {
    axios
      .get(`https://api.llama.fi/protocol/${formattedProtocolId}`)
      .then((res) => {
        const data = [res.data];
        console.log(data);
        setProtocolData(data);
        const tvl = data[0].tvl;
        const lastElement = tvl[tvl.length - 1];
        setTvl(lastElement.totalLiquidityUSD);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [formattedProtocolId]);

  const renderRaises = (raise) => (
    <div key={raise.name}>
      <p>Total Raised: ${raise.amount}m</p>
      <p>
        {UnixConverter(raise.date)}: {raise.round} - Raised ${raise.amount}m
      </p>
    </div>
  );

  const renderInvestors = (investors) => (
    <div className="grid grid-cols-6 py-4 gap-4 text-lg text-gray-400 italic">
      {investors.map((investor) => (
        <div key={investor} className="w-full hover:underline cursor-pointer hover:text-white">
          {investor}
        </div>
      ))}
    </div>
  );

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

      <div className="grid grid-cols-2 mx-10 my-10 rounded-xl">
        <div className="col-span-2 grid grid-cols-[40%_60%] border border-gray-600  rounded-xl">
          {protocolData.map((protocol) => (
            <div
              key={protocol.id}
              className="space-y-8 text-white w-[80%] p-4 italic capitalize"
            >
              <header className="text-3xl">
                {protocolId}({protocol.symbol})
              </header>
              <div className="flex justify-between">
                <div>
                  <h1>Total Value Locked</h1>
                  <p>{numeral(tvl).format("$0.00a")}</p>
                </div>
                <div>
                  <h1>Market Cap</h1>
                  <p>{numeral(protocol.mcap).format("$0.00a")}</p>
                </div>
                <div>
                  <h1>mcap/TVL</h1>
                  <p>{(protocol.mcap / tvl).toFixed(2)}</p>
                </div>
              </div>
              <div>
                <p>Chain breakdown</p>
                <div className="flex space-x-4">
                  {protocol.chainTvls.length > 1 ? (
                    <p className="flex space-x-4 whitespace-pre-wrap">
                      {protocol.chainTvls.map((chain) => (
                        <div key={chain.id} className="flex">
                          <h1>{chain}</h1>
                          <p>{chain}</p>
                        </div>
                      ))}
                    </p>
                  ) : (
                    <p>{protocol.chain}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <Chart />
        </div>

        <header className="mt-10 mb-2 text-2xl">Protocol Infromation</header>
        {protocolData.map((protocol) => (
          <div
            key={protocol.id}
            className="space-y-4 col-span-2 p-4 w-full rounded-xl border border-gray-600"
          >
            <p className="text-justify">{protocol.description}</p>
            <p>Category: {protocol.category}</p>
            {protocol.listedAt ? (
              <p>Created at: {UnixConverter(protocol.listedAt)}</p>
            ) : null}
            {protocol.audit_links ? (
              <div>
                <h2>Audits:</h2>
                {protocol.audit_links.map((audits) => (
                  <div>{audits}</div>
                ))}
              </div>
            ) : null}
          </div>
        ))}

        <header className="mt-10 mb-2 text-2xl">Token Information</header>
        {protocolData.map((protocol) => (
          <div
            key={protocol.id}
            className="col-span-2 space-y-4 p-4 w-full rounded-xl border border-gray-600"
          >
            <p>Address: {protocol.address}</p>
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

        {protocolData ? 
          <>
            {protocolData[0].raises != 0 ? (
              <>
                <header className="mt-10 mb-2 text-2xl">Raises</header>
                {protocolData.map((protocol) => (
                  <div key={protocol.id} className="col-span-2">
                    <div className="col-span-2 p-4 rounded-xl border border-gray-600">
                      <div className="space-y-4">
                        {protocol.raises.map(renderRaises)}
                      </div>
                    </div>
                    <header className="mt-10 mb-2 text-2xl">
                      Lead Investors
                    </header>
                    <div className="col-span-2 p-4 w-full rounded-xl border border-gray-600">
                      {protocol.raises.map((raise) => (
                        <div key={raise.name}>
                          {renderInvestors(raise.leadInvestors)}
                        </div>
                      ))}
                    </div>
                    <header className="mt-10 mb-2 text-2xl">
                      Other Investors
                    </header>
                    <div className="col-span-2 mb-10 p-4 w-full rounded-xl border border-gray-600">
                      {protocol.raises.map((raise) => (
                        <div key={raise.name}>
                          {renderInvestors(raise.otherInvestors)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : null}
          </>
         : null}
      </div>
    </main>
  );
};

export default ProtocolPage;
