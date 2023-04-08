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
    <div className="h-max mx-10 border rounded-xl border-gray-600 p-2">
      <div className="grid grid-cols-5 p-2 text-right uppercase italic">
        <header className="text-left">Name</header>
        <header>Chain</header>
        <header>1d volume change</header>
        <header>Today's Volume</header>
        <header>Monthly Volume</header>
      </div>
      {bridges ? (
        bridges
          .filter((bridge) => bridge.currentDayVolume > 1000)
          .map((bridge) => (
            <div
              className="grid grid-cols-5 items-center text-right p-2 border-gray-600 border-t "
              key={bridge.id}
            >
              <div className="text-left text-blue-400 ">
                {bridge.displayName}
              </div>

              <div className="capitalize">{bridge.name}</div>

              <div>
                <CalculateChange
                  lastDay={bridge.dayBeforeLastVolume}
                  today={bridge.volumePrevDay}
                />
              </div>

              <div>{numeral(bridge.currentDayVolume).format("$0.00a")}</div>

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
