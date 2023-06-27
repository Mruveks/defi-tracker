import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Charts from "./Chart";

const Chart = () => {
	const { protocolId } = useParams();
	const [formattedData, setFormattedData] = useState([]);
	const [volumeData, setVolumeData] = useState([]);

	useEffect(() => {
		axios
			.get(
				`https://api.llama.fi/protocol/${protocolId
					.replace(/ /g, "-")
					.toLowerCase()}`
			)
			.then((res) => {
				const data = [res.data];
				if (data[0].category === "Dexes") {
					axios
						.get(
							`https://api.llama.fi/summary/dexs/${protocolId
								.replace(/ /g, "-")
								.toLowerCase()}?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=totalVolume`
						)
						.then((res) => {
							const volume = res.data.totalDataChart;
							const volumeData = volume.map(([date, volume]) => ({
								date: parseInt(date),
								volume,
							}));
							setVolumeData(volumeData);
						})
						.catch((err) => console.log(err));
				}

				const formattedData = data[0].tvl.map((item) => {
					return {
						date: item.date,
						value: Number(item.totalLiquidityUSD),
					};
        });
        console.log(data)

				setFormattedData(formattedData);
			})
			.catch((err) => {
				console.log(err);
			});
  }, [protocolId]);
  
  const mergedData = formattedData.map((item) => {
		const volumeItem = volumeData.find((vItem) => {
			return parseInt(vItem.date) === parseInt(item.date);
		});

		return {
			...item,
			...volumeItem,
		};
  });
  console.log(mergedData)

	return (
		<div className="flex">
			<Charts data={mergedData} />
		</div>
	);
};

export default Chart;
