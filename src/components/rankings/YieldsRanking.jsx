import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../Loader";
import numeral from "numeral";
import { Link } from "react-router-dom";
const YieldsRanking = () => {
  const [query, setQuery] = useState("");
  const [Yields, setYields] = useState([]);

  useEffect(() => {
    axios
      .get("https://yields.llama.fi/pools")
      .then((res) => {
        setYields(res.data.data);
        console.log(Yields);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const buttonStyle = `px-4 bg-gray-700 my-4 rounded-lg text-lg hover:bg-gray-600 transition duration-100`;

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

      <div className="h-max mb-8 border rounded-xl border-gray-600 p-2">
        <div className="grid grid-cols-7 sm:grid-cols-4 font-semibold p-2 text-lg sm:text-sm text-right capitalize italic">
          <header className="text-left pl-12">Pool</header>
          <header className="text-left pl-4">Project</header>
          <header className="sm:hidden block">Chain</header>
          <header>APY</header>
          <header className="sm:hidden block">Base APY</header>
          <header className="sm:hidden block">Reward APY</header>
          <header>TVL</header>
        </div>

        {query === "" ? (
          Yields.length ? (
            Yields.filter(
              (item) =>
                item.apy != null && item.apy != "0" && item.tvlUsd >= 1000000
            ).map((pool, index) => (
              <div
                key={index}
                className={` ${
                  index % 2 === 0 ? "bg-[#222f3e]" : "bg-gray-800"
                } grid grid-cols-7 sm:grid-cols-4 items-center rounded-xl p-2 text-right`}
              >
                <div className="flex space-x-4 text-left p-2 capitalize items-center">
                  <p className="w-6">{index + 1}</p>
                  <p>{pool.symbol.toLowerCase()}</p>
                </div>
                <Link
                  to={`/protocol/${pool.project}`}
                  className="flex items-center space-x-2 px-2 w-fit text-left hover:bg-gray-600 transition duration-300 rounded-xl"
                >
                  <div className="w-fit md:w-40 px-2 capitalize my-auto text-blue-400">
                    {pool.project}
                  </div>
                </Link>
                <div className="sm:hidden block">{pool.chain}</div>

                {pool.apy ? (
                  <div>{parseFloat(pool.apy).toFixed(2) + "%"}</div>
                ) : (
                  <div></div>
                )}

                {pool.apyBase ? (
                  <div className="sm:hidden block">
                    {parseFloat(pool.apyBase).toFixed(2) + "%"}
                  </div>
                ) : (
                  <div className="sm:hidden block"></div>
                )}

                {pool.apyReward ? (
                  <div className="sm:hidden block">
                    {parseFloat(pool.apyReward).toFixed(2) + "%"}
                  </div>
                ) : (
                  <div className="sm:hidden block"></div>
                )}

                {numeral(pool.tvlUsd).format("$0.00a")}
              </div>
            ))
          ) : (
            <Loader />
          )
        ) : Yields.length ? (
          Yields.filter(
            (item) =>
              item.apy != null &&
              item.apy != "0" &&
              item.tvlUsd >= 1000000 &&
              item.chain === query
          ).map((pool, index) => (
            <div
              className={` ${
                index % 2 === 0 ? "bg-[#222f3e]" : "bg-gray-800"
              } grid grid-cols-7 sm:grid-cols-5 items-center p-2 rounded-xl text-right`}
              key={index}
            >
              <div className="text-left capitalize">
                {pool.symbol.toLowerCase()}
              </div>
              <Link
                to={`/protocol/${pool.project}`}
                className="flex w-max items-center text-left hover:bg-gray-600 transition duration-100 rounded-xl"
              >
                <div className="w-fit md:w-40 px-2 my-auto capitalize text-blue-400">
                  {pool.project}
                </div>
              </Link>
              <div>{pool.chain}</div>

              {pool.apy ? (
                <div>{parseFloat(pool.apy).toFixed(2) + "%"}</div>
              ) : (
                <div></div>
              )}

              {pool.apyBase ? (
                <div className="sm:hidden block">
                  {parseFloat(pool.apyBase).toFixed(2) + "%"}
                </div>
              ) : (
                <div></div>
              )}

              {pool.apyReward ? (
                <div className="sm:hidden block">
                  {parseFloat(pool.apyReward).toFixed(2) + "%"}
                </div>
              ) : (
                <div></div>
              )}

              {numeral(pool.tvlUsd).format("$0.00a")}
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default YieldsRanking;
