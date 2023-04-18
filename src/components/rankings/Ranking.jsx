import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import axios from "axios";
import numeral from "numeral";
import { Link } from "react-router-dom";

const Ranking = ({ chain }) => {
  const [protocols, setProtocols] = useState([]);
  let CapChain = "";

  const capitalizeChain = (chain) => {
    if (chain && typeof chain === "string") {
      return (CapChain = chain.charAt(0).toUpperCase() + chain.slice(1));
    }
    return "";
  };
  capitalizeChain(chain);

  useEffect(() => {
    axios
      .get("https://api.llama.fi/protocols")
      .then((res) => {
        setProtocols(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="h-max border rounded-xl border-gray-600 p-2">
      <div
        className={`grid ${
          chain === "Lending" || "CEX" ? "grid-cols-5" : "grid-cols-6"
        } sm:grid-cols-3 font-semibold p-2 text-lg sm:text-sm capitalize italic text-right`}
      >
        <header className="text-left">Name</header>
        {chain === "Lending" || "CEX" || "DEX" ? null : (
          <header className="text-right">Category</header>
        )}
        <header className="sm:hidden block">1h Change</header>
        <header>1d Change</header>
        <header className="sm:hidden block">7d Change</header>
        <header>TVL</header>
      </div>

      {protocols.length ? (
        protocols
          .filter(
            (item) =>
              item.tvl != null &&
              item.tvl >= 1000 &&
              item.category !== "Chain" &&
              (CapChain === "CEX" || item.category !== "CEX") &&
              (item.chain === CapChain || item.category === CapChain)
          )
          .map((protocol, index) => (
            <div
              key={index}
              className={`grid ${
                index % 2 === 0 ? "bg-[#222f3e]" : "bg-gray-800"
              }  ${
                CapChain === "Lending" || "CEX" || "DEX"
                  ? "grid-cols-5"
                  : "grid-cols-6"
              } sm:grid-cols-3 items-center p-2 rounded-xl text-right`}
            >
              <Link
                to={`/protocol/${protocol.name}`}
                className="flex items-center space-x-4 p-2 w-fit text-left hover:bg-gray-600 transition duration-300 rounded-xl"
              >
                <p className="w-6">{index + 1}</p>
                <img
                  src={protocol.logo}
                  alt="logo"
                  className="h-8 w-8 rounded-full"
                />
                <div className="w-fit md:w-40 my-auto text-blue-400">
                  {protocol.name}
                </div>
              </Link>

              {CapChain === "Lending" || "CEX" || "DEX" ? null : (
                <div>{protocol.category}</div>
              )}

              {protocol.change_1h > 0 ? (
                <div className="sm:hidden block text-green-500">
                  +{parseFloat(protocol.change_1h).toFixed(2)}%
                </div>
              ) : (
                <div className="sm:hidden block text-red-500">
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
                <div className="sm:hidden block text-green-500">
                  +{parseFloat(protocol.change_7d).toFixed(2)}%
                </div>
              ) : (
                <div className="sm:hidden block text-red-500">
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
  );
};

export default Ranking;
