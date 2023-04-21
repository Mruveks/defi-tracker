import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import SearchList from "../../components/SearchList";
import moment from "moment";
import { Helmet } from "react-helmet";
import ProtocolsChart from "../../components/charts/ProtocolsChart";
import Loader from "../../components/Loader";
import numeral from "numeral";
import ProtocolAddress from "../../utilities/ProtocolAddress";
import { BsArrowUpRight } from "react-icons/bs";
import AddressFormatter from "../../utilities/AddressFormatter";
import BackButton from "../../components/BackButton";

const ProtocolPage = () => {
  const { protocolId } = useParams();
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
      <p>
        {moment.unix(raise.date).toDate().toLocaleString()}: {raise.round} - $
        {raise.amount}m
      </p>
    </div>
  );

  const renderInvestors = (investors) => (
    <div className="grid text-lg text-gray-400 italic">
      {investors.map((investor ,index) => (
        <div
        key={index}
        className={`${ index % 2 === 0 ? "bg-[#222f3e]" : "bg-gray-800"} rounded-xl p-2 capitalize hover:underline cursor-pointer hover:text-white`}
        >
          {investor}
        </div>
      ))}
    </div>
  );
  
  
  return (
    <main className="mx-10 sm:mx-5">
      <Helmet>
        <title>
          {protocolId.charAt(0).toUpperCase() + protocolId.slice(1)} | DeFi
        </title>
        <meta
          name="description"
          content={`Learn more about ${protocolId} features and how it works on our website.`}
        />
      </Helmet>

      <BackButton />
      <SearchList />

      {protocolData.length ? (
        <div className="grid grid-cols-2 mb-5 rounded-xl">
          <div className="col-span-2 my-8 flex items-center text-center text-6xl sm:space-x-0 justify-center space-x-10 font-serif italic capitalize">
            <img
              src={protocolData[0].logo}
              alt={protocolId}
              className="sm:hidden h-16 w-16 rounded-full"
            />
            <header>{protocolId}</header>
            <img
              src={protocolData[0].logo}
              alt={protocolId}
              className="sm:hidden h-16 w-16 rounded-full shadow-"
            />
          </div>
          <div className="col-span-2 mb-8 grid sm:grid-cols-1 grid-cols-[25%_75%] border border-gray-600 rounded-xl">
            {protocolData.map((protocol) => (
              <div
                key={protocol.id}
                className="space-y-8 h-fit text-white sm:w-full p-4 italic capitalize"
              >
                <div className="grid sm:grid-flow-col sm:items-center gap-4">
                  <div>
                    <h1>Total Value Locked</h1>
                    <p>{numeral(tvl).format("$0.00a")}</p>
                  </div>
                  {protocol.mcap > 0 ? (
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
                  ) : (
                    <>
                      <div>
                        <h1>Market Cap</h1>
                        <p>-</p>
                      </div>
                      <div>
                        <h1>mcap/TVL</h1>
                        <p>-</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="grid w-full items-center">
                  <h1>Chain breakdown</h1>
                  <div className=" w-full">
                    <Link
                      to={`/chain/${protocol.chain.toLowerCase()}`}
                      className="hover:underline"
                    >
                      {protocol.chain}
                    </Link>

                    {protocol.chains.length > 0 ? (
                      <div className="flex flex-wrap text-justify">
                        {protocol.chains
                          .filter((chain) => chain != protocol.chain)
                          .map((chain) => (
                            <div key={chain.id} className="w-fit pr-2 ">
                              <Link
                                to={`/chain/${chain.toLowerCase()}`}
                                className="hover:underline"
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
              </div>
            ))}
            <ProtocolsChart />
          </div>
          {protocolData.map((protocol) => (
            <div
              key={protocol.id}
              className="col-span-2  grid grid-cols-2 sm:grid-cols-1 rounded-xl border border-gray-600"
            >
              <div className="space-y-4 p-4 border-r  border-gray-600">
                <header className="text-4xl">Protocol Information</header>
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
                    <h2 cl>Audits:</h2>
                    {protocol.audit_links.map((audits) => (
                      <a
                        href={audits}
                        target="__blank"
                        className="hover:underline italic flex overflow-x-clip"
                      >
                        {audits}
                      </a>
                    ))}
                  </div>
                ) : null}
                <div className="flex space-x-2">
                  <a href={protocol.url} target="_blank">
                    <button className="px-4 space-x-2 flex items-center py-2 rounded bg-gray-900 w-fit hover:bg-gray-600 transition duration-300">
                      <p>Website</p>
                      <BsArrowUpRight />
                    </button>
                  </a>
                  <a
                    href={`https://twitter.com/${protocol.twitter}`}
                    target="_blank"
                  >
                    <button className="px-4 space-x-2 h-full flex items-center rounded bg-gray-900 w-fit hover:bg-gray-600 transition duration-300">
                      <p>Twitter</p>
                      <BsArrowUpRight />
                    </button>
                  </a>
                </div>

                {protocol.raises && protocol.raises.length > 0 && (
                  <div className="space-y-12 pt-6">
                    <div>
                      <header className="text-4xl mb-2">Raises</header>
                      <div className="space-y-4">
                        {protocol.raises.map(renderRaises)}
                      </div>
                    </div>
                    <div className="grid gap-20 grid-cols-2">
                    <div>
                      <header className="text-4xl">Lead Investors</header>
                      {protocol.raises.map((raise, index) => (
                        <div key={index}>
                          {renderInvestors(raise.leadInvestors)}
                        </div>
                      ))}
                    </div>
                    <div>
                      <header className="text-4xl">Other Investors</header>
                      {protocol.raises.map((raise) => (
                        <>
                          {raise.otherInvestors.length > 0 ? (
                            <div key={raise.name}>
                              {renderInvestors(raise.otherInvestors)}
                            </div>
                          ) : null}
                        </>
                      ))}
                    </div>
                      </div>
                  </div>
                )}
              </div>

              <div className="space-y-4 p-4 sm:border-t border-gray-600">
                <header className="text-4xl">Token Information</header>
                <div className="flex space-x-2 overflow-hidden">
                  <p>Address: </p>
                  {protocol.address !== null ? (
                    <AddressFormatter address={protocol.address} />
                  ) : (
                    <p className="text-gray-600">No address available</p>
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
                        <button className="flex space-x-2 items-center px-4 py-2 rounded bg-gray-900 w-fit hover:bg-gray-600 transition duration-300">
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
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default ProtocolPage;
