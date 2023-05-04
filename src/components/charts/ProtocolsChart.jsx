import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import Charts from "./Chart";

const Chart = () => {
  const { protocolId } = useParams();
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.llama.fi/protocol/${protocolId
          .replace(/ /g, "-")
          .toLowerCase()}`
      )
      .then((res) => {
        const data = [res.data];
        const formattedData = data[0].tvl.map((item) => {
          return {
            date: moment.unix(item.date).toDate(),
            value: Number(item.totalLiquidityUSD),
          };
        });
        setFormattedData(formattedData);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [protocolId]);

  return (
    <div className="flex">
      <Charts data={formattedData} />
    </div>
  );
};

export default Chart;
