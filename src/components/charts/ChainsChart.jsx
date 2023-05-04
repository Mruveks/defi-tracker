import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import Charts from "./Chart";

const Chart = () => {
  const { chainId } = useParams();
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.llama.fi/v2/historicalChainTvl/${chainId
          .replace(/ /g, "-")
          .toLowerCase()}`
      )
      .then((res) => {
        const data = [res.data];
        const formattedData = data[0].map((item) => {
          return {
            date: moment.unix(item.date).toDate(),
            value: Number(item.tvl),
          };
        });
        setFormattedData(formattedData);
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [chainId]);

  return (
    <div className="w-full h-full flex py-4 sm:px-4">
      <Charts data={formattedData} />
    </div>
  );
};

export default Chart;
