import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../Loader";
import numeral from "numeral";
import { Link } from "react-router-dom";

const TVLranking = () => {
  const [protocols, setProtocols] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://api.llama.fi/protocols")
      .then((res) => {
        setProtocols(res.data);
        const datas = protocols
          .filter((item) => item.category === "Chain")
          .map((item) => item);
        console.log(datas);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const buttonStyle = `px-4 bg-gray-700 rounded-lg text-lg hover:bg-gray-600 transition duration-100`;

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-between h-full">
        <button
          className={`${buttonStyle} ${query === "" ? "bg-blue-600" : ""}`}
          onClick={() => setQuery("")}
        >
          All
        </button>

        <button
          className={`${buttonStyle} ${
            query === "Ethereum" ? "bg-blue-600" : ""
          }`}
          onClick={() => setQuery("Ethereum")}
        >
          Ethereum
        </button>

        <button
          className={`${buttonStyle} ${
            query === "Avalanche" ? "bg-blue-600" : ""
          }`}
          onClick={() => setQuery("Avalanche")}
        >
          Avalanche
        </button>

        <button
          className={`${buttonStyle} ${
            query === "Binance" ? "bg-blue-600" : ""
          }`}
          onClick={() => setQuery("Binance")}
        >
          Binance
        </button>

        <button
          className={`${buttonStyle} ${query === "Tron" ? "bg-blue-600" : ""}`}
          onClick={() => setQuery("Tron")}
        >
          Tron
        </button>

        <button
          className={`${buttonStyle} ${
            query === "Arbitrum" ? "bg-blue-600" : ""
          }`}
          onClick={() => setQuery("Arbitrum")}
        >
          Arbitrum
        </button>

        <button
          className={`${buttonStyle} ${
            query === "Polygon" ? "bg-blue-600" : ""
          }`}
          onClick={() => setQuery("Polygon")}
        >
          Polygon
        </button>

        <button
          className={`${buttonStyle} ${
            query === "Cronos" ? "bg-blue-600" : ""
          }`}
          onClick={() => setQuery("Cronos")}
        >
          Cronos
        </button>

        <button
          className={`${buttonStyle} ${
            query === "Fantom" ? "bg-blue-600" : ""
          }`}
          onClick={() => setQuery("Fantom")}
        >
          Fantom
        </button>

        <button
          className={`${buttonStyle} ${query === "Mixin" ? "bg-blue-600" : ""}`}
          onClick={() => setQuery("Mixin")}
        >
          Mixin
        </button>

        <button
          className={`${buttonStyle} ${
            query === "DefiChain" ? "bg-blue-600" : ""
          }`}
          onClick={() => setQuery("DefiChain")}
        >
          DefiChain
        </button>

        <button
          className={`${buttonStyle} ${
            query === "Optimism" ? "bg-blue-600" : ""
          }`}
          onClick={() => setQuery("Optimism")}
        >
          Optimism
        </button>

        <button
          className={`${buttonStyle} ${
            query === "Solana" ? "bg-blue-600" : ""
          }`}
          onClick={() => setQuery("Solana")}
        >
          Solana
        </button>
        <button
          className={`${buttonStyle} ${
            query === "Bitcoin" ? "bg-blue-600" : ""
          }`}
          onClick={() => setQuery("Bitcoin")}
        >
          Bitcoin
        </button>
      </div>

      <div className="h-max my-4 text-lg border-gray-600 border p-2 rounded-xl bg-gray-800">
        <div className="grid grid-cols-8 lg:grid-cols-6 sm:grid-cols-2 text-xl sm:text-sm font-semibold p-2 border-b-gray-600 text-right italic capitalize">
          <header className="text-left pl-12 sm:pl-0">Name</header>
          <header className="sm:hidden md:hidden lg:hidden block">
            Category
          </header>
          <header className="sm:hidden md:hidden lg:hidden block">Chain</header>
          <header className="sm:hidden block">1h Change</header>
          <header className="sm:hidden block">1d Change</header>
          <header className="sm:hidden block">7d Change</header>
          <header>TVL</header>
          <header className="sm:hidden block">Mcap/TVL</header>
        </div>

        {query === "" ? (
          protocols.length ? (
            protocols
              .filter(
                (item) =>
                  item.tvl != null &&
                  item.tvl >= 1000000 &&
                  item.category !== "CEX" &&
                  item.category !== "Chain"
              )
              .map((protocol, index) => (
                <div
                  key={index}
                  className={` ${
                    index % 2 === 0 ? "bg-[#222f3e]" : "bg-gray-800"
                  } grid grid-cols-8 md:grid-cols-6 lg:grid-cols-6 sm:grid-cols-2 items-center rounded-xl p-2 text-right`}
                >
                  <Link
                    to={`/protocol/${protocol.name}`}
                    className="flex items-center sm:space-x-0 space-x-4 w-full px-2 sm:px-0 py-2 text-left hover:bg-gray-600 transition duration-300 rounded-xl"
                  >
                    <p className="w-6 sm:hidden">{index + 1}</p>
                    <img
                      src={protocol.logo}
                      alt="logo"
                      className="h-8 w-8 rounded-full "
                    />
                    <div className="w-full text-blue-400 sm:pl-2">
                      {protocol.name}
                    </div>
                  </Link>

                  <div className="sm:hidden md:hidden lg:hidden block">
                    {protocol.category}
                  </div>
                  <div className="sm:hidden md:hidden lg:hidden block">
                    {protocol.chain}
                  </div>

                  {protocol.change_1h > 0 ? (
                    <div className="text-green-500 sm:hidden block">
                      +{parseFloat(protocol.change_1h).toFixed(2)}%
                    </div>
                  ) : (
                    <div className="text-red-500 sm:hidden block">
                      {parseFloat(protocol.change_1h).toFixed(2)}%
                    </div>
                  )}

                  {protocol.change_1d > 0 ? (
                    <div className="text-green-500 sm:hidden block">
                      +{parseFloat(protocol.change_1d).toFixed(2)}%
                    </div>
                  ) : (
                    <div className="text-red-500 sm:hidden block">
                      {parseFloat(protocol.change_1d).toFixed(2)}%
                    </div>
                  )}

                  {protocol.change_7d > 0 ? (
                    <div className="text-green-500 sm:hidden block">
                      +{parseFloat(protocol.change_7d).toFixed(2)}%
                    </div>
                  ) : (
                    <div className="text-red-500 sm:hidden block">
                      {parseFloat(protocol.change_7d).toFixed(2)}%
                    </div>
                  )}

                  {numeral(protocol.tvl).format("$0.00a")}

                  {protocol.mcap ? (
                    <div className="sm:hidden block">
                      {(protocol.mcap / protocol.tvl).toFixed(2)}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ))
          ) : (
            <Loader />
          )
        ) : protocols.length ? (
          protocols
            .filter(
              (item) =>
                item.tvl != null &&
                item.chain === query &&
                item.tvl >= 1000000 &&
                item.category !== "CEX" &&
                item.category !== "Chain"
            )
            .map((protocol, index) => (
              <div
                key={index}
                className={` ${
                  index % 2 === 0 ? "bg-[#222f3e]" : "bg-gray-800"
                } grid grid-cols-8 md:grid-cols-6 lg:grid-cols-6 sm:grid-cols-2 items-center rounded-xl p-2 text-right`}
              >
                <Link
                  to={`/protocol/${protocol.name}`}
                  className="flex items-center sm:space-x-0 space-x-4 w-full px-2 sm:px-0 py-2 text-left hover:bg-gray-600 transition duration-300 rounded-xl"
                >
                  <p className="w-6 sm:hidden">{index + 1}</p>
                  <img
                    src={protocol.logo}
                    alt="logo"
                    className="h-8 w-8 rounded-full "
                  />
                  <div className="w-full text-blue-400 sm:pl-2">
                    {protocol.name}
                  </div>
                </Link>

                <div className="sm:hidden md:hidden lg:hidden block">
                  {protocol.category}
                </div>
                <div className="sm:hidden md:hidden lg:hidden block">
                  {protocol.chain}
                </div>

                {protocol.change_1h > 0 ? (
                  <div className="text-green-500 sm:hidden block">
                    +{parseFloat(protocol.change_1h).toFixed(2)}%
                  </div>
                ) : (
                  <div className="text-red-500 sm:hidden block">
                    {parseFloat(protocol.change_1h).toFixed(2)}%
                  </div>
                )}

                {protocol.change_1d > 0 ? (
                  <div className="text-green-500 sm:hidden block">
                    +{parseFloat(protocol.change_1d).toFixed(2)}%
                  </div>
                ) : (
                  <div className="text-red-500 sm:hidden block">
                    {parseFloat(protocol.change_1d).toFixed(2)}%
                  </div>
                )}

                {protocol.change_7d > 0 ? (
                  <div className="text-green-500 sm:hidden block">
                    +{parseFloat(protocol.change_7d).toFixed(2)}%
                  </div>
                ) : (
                  <div className="text-red-500 sm:hidden block">
                    {parseFloat(protocol.change_7d).toFixed(2)}%
                  </div>
                )}

                {numeral(protocol.tvl).format("$0.00a")}
                {protocol.mcap ? (
                  <div className="sm:hidden block">
                    {(protocol.mcap / protocol.tvl).toFixed(2)}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ))
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default TVLranking;
