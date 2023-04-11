import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import SearchList from "../../components/SearchList";
import moment from "moment";
import { Helmet } from "react-helmet";
import ProtocolsChart from "../../components/charts/ProtocolsChart";
import numeral from "numeral";
import ProtocolAddress from "../../utilities/ProtocolAddress";
import { BsArrowUpRight } from "react-icons/bs";

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
        {moment.unix(raise.date).toDate().toLocaleString()}: {raise.round} - $
        {raise.amount}m
      </p>
    </div>
  );

  const renderInvestors = (investors) => (
    <div className="grid grid-cols-6 py-4 gap-4 text-lg text-gray-400 italic">
      {investors.map((investor) => (
        <div
          key={investor}
          className="w-full hover:underline cursor-pointer hover:text-white"
        >
          {investor}
        </div>
      ))}
    </div>
  );
  console.log(protocolData);

  return (
    <main>
      <Helmet>
        <title>
          {protocolId.charAt(0).toUpperCase() + protocolId.slice(1)} | DeFi
        </title>
        <meta
          name="description"
          content={`Learn more about ${protocolId} features and how it works on our website.`}
        />
      </Helmet>

      <div className="mx-10">
        <SearchList />
      </div>

      <div className="grid grid-cols-2 mx-10 my-10 rounded-xl">
        <div className="col-span-2 grid grid-cols-[25%_75%] border border-gray-600  rounded-xl">
          {protocolData ? (
            protocolData.map((protocol) => (
              <div
                key={protocol.id}
                className="space-y-8 h-96 text-white w-[80%] p-4 italic capitalize"
              >
                <div className="flex space-x-2 items-center">
                  <img
                    src={protocol.logo}
                    alt={protocolId}
                    className="h-12 w-12 rounded-full"
                  />
                  <header className="text-3xl">
                    {protocolId} ({protocol.symbol})
                  </header>
                </div>
                <div className="grid gap-4">
                  <div>
                    <h1>Total Value Locked</h1>
                    <p>{numeral(tvl).format("$0.00a")}</p>
                  </div>
                  {protocol.mcap !== null ? (
                    <>
                      <div>
                        <h1>Market Cap</h1>
                        <p>{numeral(protocol.mcap).format("$0.00a")}</p>
                      </div>
                      <div>
                        <h1>mcap/TVL</h1>
                        <p>{(protocol.mcap / tvl).toFixed(2)}</p>
                      </div>
                    </>
                  ) : null}
                </div>
                <div>
                  <h1>Chain breakdown</h1>
                  <Link
                    key={protocol.chain}
                    to={`/chain/${protocol.chain}`}
                    className="flex space-x-2 items-center hover:underline w-fit"
                  >
                    {protocol.chain}
                  </Link>
                  {protocol.chains.length > 0 ? (
                    <div className="grid grid-cols-2">
                      {protocol.chains
                        .filter((chain) => chain != protocol.chain)
                        .map((chain) => (
                          <div key={chain.id}>
                            <Link
                              key={chain}
                              to={`/chain/${chain}`}
                              className="flex space-x-2 items-center hover:underline w-fit"
                            >
                              {chain}
                            </Link>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p>{protocol.chain}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
          <ProtocolsChart />
        </div>
        {protocolData &&
        (Array.isArray(protocolData)
          ? protocolData.length > 0
          : Object.keys(protocolData).length > 0) ? (
          Array.isArray(protocolData) ? (
            protocolData.map((protocol) => (
              <div
                key={protocol.id}
                className="mt-10 space-y-4 p-4 w-full rounded-l-xl rounded-r-none border border-r-0 border-l-gray-600 border-y-gray-600"
              >
                <header className="text-2xl">Protocol Information</header>
                <p className="text-justify">{protocol.description}</p>
                <p>Category: {protocol.category}</p>
                {protocol.listedAt ? (
                  <p>
                    Created at:{" "}
                    {moment.unix(protocol.listedAt).toDate().toLocaleString()}
                  </p>
                ) : null}
                {protocol.audit_links ? (
                  <div>
                    <h2>Audits:</h2>
                    {protocol.audit_links.map((audits) => (
                      <a
                        href={audits}
                        target="__blank"
                        className="hover:underline italic grid"
                      >
                        {audits}
                      </a>
                    ))}
                  </div>
                ) : null}
                <div className="flex space-x-2">
                  <a href={protocol.url} target="_blank">
                    <button className="px-4 space-x-2 flex items-center py-2 rounded bg-gray-900 w-fit hover:bg-gray-600">
                      <p>Website</p>
                      <BsArrowUpRight />
                    </button>
                  </a>
                  <a
                    href={`https://twitter.com/${protocol.twitter}`}
                    target="_blank"
                  >
                    <button className="px-4 space-x-2 h-full flex items-center rounded bg-gray-900 w-fit hover:bg-gray-600">
                      <p>Twitter</p>
                      <BsArrowUpRight />
                    </button>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div
              key={protocolData.id}
              className="space-y-4 col-span-2 p-4 w-full rounded-xl border border-gray-600"
            >
              <p className="text-justify">{protocolData.description}</p>
              <p>Category: {protocolData.category}</p>
              {protocolData.listedAt ? (
                <p>
                  Created at:{" "}
                  {moment.unix(protocol.listedAt).toDate().toLocaleString()}
                </p>
              ) : null}
              {protocolData.audit_links ? (
                <div>
                  <h2>Audits:</h2>
                  {protocolData.audit_links.map((audits) => (
                    <div>{audits}</div>
                  ))}
                </div>
              ) : null}
            </div>
          )
        ) : (
          <div>No protocol information available.</div>
        )}
        {Array.isArray(protocolData) && protocolData.length > 0 ? (
          protocolData.map((protocol) => (
            <div
              key={protocol.id}
              className="mt-10 space-y-4 p-4 w-full rounded-r-xl rounded-l-none border border-gray-600"
            >
              <header className="text-2xl">Token Information</header>
              <div className="flex space-x-2">
                <p>Address: </p>
                {protocol.address !== null ? (
                  <p className="italic">{protocol.address}</p>
                ) : (
                  <p>No address available</p>
                )}
              </div>
              {protocol.address !== null ? (
                <div className="flex space-x-2 items-center">
                  <p>
                    <a
                      href={`https://www.coingecko.com/en/coins/${protocol.gecko_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="flex space-x-2 items-center px-4 py-2 rounded bg-gray-900 w-fit hover:bg-gray-600">
                        <p>View on CoinGecko</p>
                        <BsArrowUpRight />
                      </button>
                    </a>
                  </p>
                  <p>
                    <ProtocolAddress address={protocol.address} />
                  </p>
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <div></div>
        )}

        {protocolData && (
          <>
            {Array.isArray(protocolData)
              ? protocolData.length > 0 &&
                protocolData.map((protocol) => (
                  <div
                    key={protocol.id}
                    className="col-span-2 mt-10 space-y-10"
                  >
                    {protocol.raises && protocol.raises.length > 0 && (
                      <>
                        <div className="grid-cols-2 p-4 rounded-xl border border-gray-600">
                          <header className="text-2xl">Raises</header>
                          <div className="space-y-4">
                            {protocol.raises.map(renderRaises)}
                          </div>
                        </div>
                        <div className="p-4 w-full rounded-xl border border-gray-600">
                          <header className="mb-2 text-2xl">
                            Lead Investors
                          </header>
                          {protocol.raises.map((raise) => (
                            <div key={raise.name}>
                              {renderInvestors(raise.leadInvestors)}
                            </div>
                          ))}
                        </div>
                        <div className="p-4 w-full rounded-xl border border-gray-600">
                          <header className="text-2xl">Other Investors</header>
                          {protocol.raises.map((raise) => (
                            <div key={raise.name}>
                              {renderInvestors(raise.otherInvestors)}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))
              : protocolData.raises &&
                protocolData.raises.length > 0 && (
                  <>
                    <header className="mt-10 mb-2 text-2xl">Raises</header>
                    <div className="col-span-2 p-4 rounded-xl border border-gray-600">
                      <div className="space-y-4">
                        {protocolData.raises.map(renderRaises)}
                      </div>
                    </div>
                    <header className="mt-10 mb-2 text-2xl">
                      Lead Investors
                    </header>
                    <div className="col-span-2 p-4 w-full rounded-xl border border-gray-600">
                      {protocolData.raises.map((raise) => (
                        <div key={raise.name}>
                          {renderInvestors(raise.leadInvestors)}
                        </div>
                      ))}
                    </div>
                    <header className="mt-10 mb-2 text-2xl">
                      Other Investors
                    </header>
                    <div className="col-span-2 mb-10 p-4 w-full rounded-xl border border-gray-600">
                      {protocolData.raises.map((raise) => (
                        <div key={raise.name}>
                          {renderInvestors(raise.otherInvestors)}
                        </div>
                      ))}
                    </div>
                  </>
                )}
          </>
        )}
      </div>
    </main>
  );
};

export default ProtocolPage;
