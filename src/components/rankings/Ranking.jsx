import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import axios from "axios";
import numeral from "numeral";
import { Link } from "react-router-dom";
import { TiArrowUnsorted } from "react-icons/ti";

const Ranking = ({ chain }) => {
  const [protocols, setProtocols] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("");
  let CapChain = "";

  const handleSort = (column) => {
    if (sortColumn === column) {
      if (sortOrder === "desc") {
        setSortOrder("asc");
      } else if (sortOrder === "asc") {
        setSortColumn("");
        setSortOrder("");
      }
    } else {
      setSortColumn(column);
      setSortOrder("desc");
    }
  };

  const capitalizeChain = (chain) => {
    if (chain && typeof chain === "string") {
      return (CapChain = chain.charAt(0).toUpperCase() + chain.slice(1));
    }
    return "";
  };
  capitalizeChain(chain);

  useEffect(() => {
    handleSort("");
  }, [chain]);

  useEffect(() => {
    axios
      .get("https://api.llama.fi/protocols")
      .then((res) => {
        setProtocols(res.data);
        console.log(protocols);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="h-max text-md border rounded-xl border-gray-600 p-2">
      <div
        className={`grid ${
          chain === "Lending" || "CEX" ? "grid-cols-5" : "grid-cols-6"
        } sm:grid-cols-2 font-semibold p-2 text-lg sm:text-sm capitalize italic text-right`}
      >
        <header className="text-left">Name</header>
        {chain === "Lending" || "CEX" || "DEX" ? null : (
          <header
            className="sm:hidden flex justify-self-end items-center space-x-2 hover:cursor-pointer w-fit"
            onClick={() => handleSort("category")}
          >
            Category <TiArrowUnsorted className="text-base text-gray-500" />
          </header>
        )}
        <header
          className="sm:hidden flex justify-self-end items-center space-x-2 hover:cursor-pointer w-fit"
          onClick={() => handleSort("change_1h")}
        >
          <p>1h Change</p>
          {sortColumn === "change_1h" && (
            <TiArrowUnsorted
              className={`text-base ${
                sortOrder === "asc" ? "text-red-500" : "text-green-500"
              }`}
            />
          )}
          {sortColumn !== "change_1h" && (
            <TiArrowUnsorted className="text-base text-gray-500" />
          )}
        </header>
        <header
          className="sm:hidden flex justify-self-end items-center space-x-2 hover:cursor-pointer w-fit"
          onClick={() => handleSort("change_1d")}
        >
          <p>1d Change</p>
          {sortColumn === "change_1d" && (
            <TiArrowUnsorted
              className={`text-base ${
                sortOrder === "asc" ? "text-red-500" : "text-green-500"
              }`}
            />
          )}
          {sortColumn !== "change_1d" && (
            <TiArrowUnsorted className="text-base text-gray-500" />
          )}
        </header>
        <header
          className="sm:hidden flex justify-self-end items-center space-x-2 hover:cursor-pointer w-fit"
          onClick={() => handleSort("change_7d")}
        >
          <p>7d Change</p>
          {sortColumn === "change_7d" && (
            <TiArrowUnsorted
              className={`text-base ${
                sortOrder === "asc" ? "text-red-500" : "text-green-500"
              }`}
            />
          )}
          {sortColumn !== "change_7d" && (
            <TiArrowUnsorted className="text-base text-gray-500" />
          )}
        </header>
        <header
          className="sm:hidden flex justify-self-end items-center space-x-2 hover:cursor-pointer w-fit"
          onClick={() => handleSort("tvl")}
        >
          TVL
          {sortColumn === "tvl" && (
            <TiArrowUnsorted
              className={`text-base ${
                sortOrder === "asc" ? "text-red-500" : "text-green-500"
              }`}
            />
          )}
          {sortColumn !== "tvl" && (
            <TiArrowUnsorted className="text-base text-gray-500" />
          )}
        </header>
      </div>

      {protocols.length ? (
        protocols
          .filter(
            (item) =>
              item.tvl != null &&
              item.tvl >= 1000 &&
              item.category !== "Chain" &&
              (CapChain === "CEX" || item.category !== "CEX") &&
              (item.chain === CapChain ||
                (item.chain === "Multi-Chain"
                  ? item.chains.includes(CapChain)
                  : null) ||
                item.category === CapChain)
          )

          .sort((a, b) => {
            if (sortOrder === "asc") {
              return a[sortColumn] - b[sortColumn];
            } else {
              return b[sortColumn] - a[sortColumn];
            }
          })
          .map((protocol, index) => (
            <div
              key={index}
              className={`grid ${
                index % 2 === 0 ? "bg-[#222f3e]" : "bg-gray-800"
              }  ${
                CapChain === "Lending" || "CEX" || "DEX"
                  ? "grid-cols-5"
                  : "grid-cols-6"
              } sm:grid-cols-2 items-center my-2 pr-2 rounded-xl text-right`}
            >
              <Link
                to={`/protocol/${protocol.name}`}
                className="flex items-center space-x-4 sm:space-x-0 px-2 sm:px-0 py-2 text-left hover:bg-gray-600 transition duration-300 rounded-xl"
              >
                <div className="w-full flex items-center text-blue-400 space-x-2">
                  <img
                    src={protocol.logo}
                    alt="logo"
                    className="h-8 w-8 rounded-full "
                  />
                  <p> {protocol.name}</p>
                </div>
              </Link>

              {CapChain === "Lending" || "CEX" || "DEX" ? null : (
                <div>{protocol.category}</div>
              )}

              {protocol.change_1h > 0 ? (
                <div className="sm:hidden block text-green-500 font-mono">
                  +{parseFloat(protocol.change_1h).toFixed(2)}%
                </div>
              ) : (
                <div className="sm:hidden block text-red-500 font-mono">
                  {parseFloat(protocol.change_1h).toFixed(2)}%
                </div>
              )}

              {protocol.change_1d > 0 ? (
                <div className="sm:hidden block text-green-500 font-mono">
                  +{parseFloat(protocol.change_1d).toFixed(2)}%
                </div>
              ) : (
                <div className="sm:hidden block text-red-500 font-mono">
                  {parseFloat(protocol.change_1d).toFixed(2)}%
                </div>
              )}

              {protocol.change_7d > 0 ? (
                <div className="sm:hidden block text-green-500 font-mono">
                  +{parseFloat(protocol.change_7d).toFixed(2)}%
                </div>
              ) : (
                <div className="sm:hidden block text-red-500 font-mono">
                  {parseFloat(protocol.change_7d).toFixed(2)}%
                </div>
              )}

              <div className="font-mono">
                {numeral(protocol.tvl).format("$0.00a")}
              </div>
            </div>
          ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Ranking;
