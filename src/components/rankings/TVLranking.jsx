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

  const buttonStyle = `m-2 py-1 px-4 bg-gray-700 rounded-lg text-lg`;

  return (
    <>
      <div className="flex flex-wrap justify-between py-2 h-full">
        <button
          className={`${buttonStyle} ${query === "" ? "bg-gray-900" : ""}`}
          onClick={() => setQuery("")}
        >
          All
        </button>

        <button
          className={`${buttonStyle} ${
            query === "Ethereum" ? "bg-gray-400" : ""
          }`}
          onClick={() => setQuery("Ethereum")}
        >
          Ethereum
        </button>

        <button
          className={`${buttonStyle} ${
            query === "Avalanche" ? "bg-red-700" : ""
          }`}
          onClick={() => setQuery("Avalanche")}
        >
          Avalanche
        </button>

        <button
          className={`${buttonStyle} ${
            query === "Binance" ? "bg-yellow-700" : ""
          }`}
          onClick={() => setQuery("Binance")}
        >
          Binance
        </button>

        <button
          className={`${buttonStyle} ${query === "Tron" ? "bg-red-700" : ""}`}
          onClick={() => setQuery("Tron")}
        >
          Tron
        </button>

        <button
          className={`${buttonStyle} ${
            query === "Arbitrum" ? "bg-blue-700" : ""
          }`}
          onClick={() => setQuery("Arbitrum")}
        >
          Arbitrum
        </button>

        <button
          className={`${buttonStyle} ${
            query === "Polygon" ? "bg-purple-700" : ""
          }`}
          onClick={() => setQuery("Polygon")}
        >
          Polygon
        </button>

        <button
          className={`${buttonStyle} ${
            query === "Optimism" ? "bg-red-700" : ""
          }`}
          onClick={() => setQuery("Optimism")}
        >
          Optimism
        </button>

        <button
          className={`${buttonStyle} ${
            query === "Solana" ? "bg-purple-700" : ""
          }`}
          onClick={() => setQuery("Solana")}
        >
          Solana
        </button>
      </div>

      <div className="h-max mb-10 border-gray-600 border p-2 rounded-xl bg-gray-800">
        <div className="grid grid-cols-7 sm:grid-cols-5 font-semibold p-2 border-b-gray-600 text-right italic uppercase">
          <header className="text-left">Name</header>
          <header className="sm:hidden block">Category</header>
          <header className="sm:hidden block">Chain</header>
          <header>1d Change</header>
          <header>7d Change</header>
          <header>30d Change</header>
          <header>TVL</header>
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
              .map((protocol) => (
                <div
                  className="grid grid-cols-7 sm:grid-cols-5 items-center p-2 border-gray-600 border-t text-right"
                  key={protocol.id}
                >
                  <Link
                    to={`/protocol/${protocol.name}`}
                    className="flex items-center w-max text-left hover:bg-gray-600 transition duration-100 rounded-full"
                  >
                    <img
                      src={protocol.logo}
                      alt="logo"
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="sm:w-fit w-40 px-2 my-auto text-blue-400">
                      {protocol.name}
                    </div>
                  </Link>

                  <div className="sm:hidden block">{protocol.category}</div>
                  <div className="sm:hidden block">{protocol.chain}</div>

                  {protocol.change_1h > 0 ? (
                    <div className="text-green-500">
                      +{parseFloat(protocol.change_1h).toFixed(2)}%
                    </div>
                  ) : (
                    <div className="text-red-500">
                      {parseFloat(protocol.change_1h).toFixed(2)}%
                    </div>
                  )}

                  {protocol.change_1d > 0 ? (
                    <div className="text-green-500">
                      +{parseFloat(protocol.change_1d).toFixed(2)}%
                    </div>
                  ) : (
                    <div className="text-red-500">
                      {parseFloat(protocol.change_1d).toFixed(2)}%
                    </div>
                  )}

                  {protocol.change_7d > 0 ? (
                    <div className="text-green-500">
                      +{parseFloat(protocol.change_7d).toFixed(2)}%
                    </div>
                  ) : (
                    <div className="text-red-500">
                      {parseFloat(protocol.change_7d).toFixed(2)}%
                    </div>
                  )}

                  {numeral(protocol.tvl).format("$0.00a")}
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
            .map((protocol) => (
              <div
                className="grid grid-cols-7 sm:grid-cols-5 items-center p-2 border-gray-600 border-t text-right"
                key={protocol.id}
              >
                <Link
                    to={`/protocol/${protocol.name}`}
                    className="flex items-center w-max text-left hover:bg-gray-600 transition duration-100 rounded-full"
                  >
                    <img
                      src={protocol.logo}
                      alt="logo"
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="sm:w-fit w-40 px-2 my-auto text-blue-400">
                      {protocol.name}
                    </div>
                  </Link>

                <div className="sm:hidden block">{protocol.category}</div>
                <div className="sm:hidden block">{protocol.chain}</div>

                {protocol.change_1h > 0 ? (
                  <div className="text-green-500">
                    +{parseFloat(protocol.change_1h).toFixed(2)}%
                  </div>
                ) : (
                  <div className="text-red-500">
                    {parseFloat(protocol.change_1h).toFixed(2)}%
                  </div>
                )}

                {protocol.change_1d > 0 ? (
                  <div className="text-green-500">
                    +{parseFloat(protocol.change_1d).toFixed(2)}%
                  </div>
                ) : (
                  <div className="text-red-500">
                    {parseFloat(protocol.change_1d).toFixed(2)}%
                  </div>
                )}

                {protocol.change_7d > 0 ? (
                  <div className="text-green-500">
                    +{parseFloat(protocol.change_7d).toFixed(2)}%
                  </div>
                ) : (
                  <div className="text-red-500">
                    {parseFloat(protocol.change_7d).toFixed(2)}%
                  </div>
                )}

                {numeral(protocol.tvl).format("$0.00a")}
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
