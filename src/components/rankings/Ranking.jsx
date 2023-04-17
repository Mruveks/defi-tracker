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
        } sm:grid-cols-3 font-semibold p-2 uppercase italic text-right`}
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
              item.tvl >= 100000 &&
              item.category !== "Chain" &&
              (CapChain === "CEX" || item.category !== "CEX") &&
              (item.chain === CapChain || item.category === CapChain)
          )
          .map((protocol) => (
            <div
              className={`grid ${
                CapChain === "Lending" || "CEX" || "DEX"
                  ? "grid-cols-5"
                  : "grid-cols-6"
              } sm:grid-cols-3 items-center p-2 border-gray-600 border-t text-right`}
              key={protocol.id}
            >
              <Link
                to={`/protocol/${protocol.name}`}
                className="flex w-fit items-center text-left hover:bg-gray-600 rounded-full transition duration-100"
              >
                <img
                  src={protocol.logo}
                  alt="logo"
                  className="h-8 w-8 rounded-full"
                />
                <div className="w-fit md:w-40 px-2 my-auto text-blue-400">
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
