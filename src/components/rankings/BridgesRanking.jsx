import React, { useState, useEffect } from "react";
import axios from "axios";
import numeral from "numeral";
import Loader from "../Loader";
import CalculateChange from "../../utilities/CalculateChange";

const BridgesRanking = () => {
  const [bridges, setBridges] = useState([]);

  useEffect(() => {
    axios
      .get("https://bridges.llama.fi/bridges?includeChains=true")
      .then((res) => {
        setBridges(res.data.bridges);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="h-max border rounded-xl border-gray-600 p-2">
      <div className="grid grid-cols-5 sm:grid-cols-3 font-semibold text-lg sm:text-sm p-2 text-right capitalize italic">
        <header className="text-left">Name</header>
        <header>Chain</header>
        <header className="sm:hidden block">1d volume change</header>
        <header className="sm:hidden block">Today's Volume</header>
        <header>Monthly Volume</header>
      </div>
      {bridges ? (
        bridges
          .filter((bridge) => bridge.currentDayVolume > 1000)
          .map((bridge, index) => (
            <div
              className={`${
                index % 2 === 0 ? "bg-[#222f3e]" : "bg-gray-800"
              } grid grid-cols-5 sm:grid-cols-3 items-center rounded-xl text-right p-2`}
              key={index}
            >
              <div className="flex space-x-4 text-left">
                <p className="w-6">{index}</p>
                <h2 className="text-blue-400">{bridge.displayName}</h2>
              </div>

              <div className="capitalize">{bridge.name}</div>

              <div className="sm:hidden block">
                <CalculateChange
                  lastDay={bridge.dayBeforeLastVolume}
                  today={bridge.volumePrevDay}
                />
              </div>

              <div className="sm:hidden block">
                {numeral(bridge.currentDayVolume).format("$0.00a")}
              </div>

              <div>{numeral(bridge.monthlyVolume).format("$0.00a")}</div>
            </div>
          ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default BridgesRanking;
