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
						date: item.date,
						value: Number(item.tvl),
					};
				});
				setFormattedData(formattedData);
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [chainId]);

	return <Charts data={formattedData} />;
};

export default Chart;
