import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const DataFetcher = () => {
	const [tvlData, setTvlData] = useState(null);
	const [mergedData, setMergedData] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [
					chainRes,
					ethRes,
					tronRes,
					arbRes,
					polyRes,
					bscRes,
					avaxRes,
					opRes,
					mixinRes,
					croRes,
					pulseRes,
				] = await Promise.all([
					axios.get("https://api.llama.fi/v2/chains"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Ethereum"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Tron"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Arbitrum"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Polygon"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Bsc"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Avalanche"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Optimism"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Mixin"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Cronos"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Pulse"),
				]);

				const chainData = chainRes.data;
				const updatedData = chainData
					.sort((a, b) => b.value - a.value)
					.map((item) => ({
						chain: item.name,
						value: item.tvl,
					}));

				const allTvl = updatedData.reduce(
					(total, item) => total + item.value,
					0
				);
				setTvlData(allTvl);

				const othersTvl = updatedData
					.slice(100)
					.reduce((total, item) => total + item.value, 0);

				const slicedData = updatedData
					.slice(0, 10)
					.concat({ chain: "Others", value: othersTvl });
				setData(slicedData);

				const mapDataWithDate = (data) =>
					data.reduce((map, item) => {
						const date = moment.unix(item.date).toDate();
						map[date] = item.tvl;
						return map;
					}, {});

				const ethDataMapped = mapDataWithDate(ethRes.data);
				const tronDataMapped = mapDataWithDate(tronRes.data);
				const arbDataMapped = mapDataWithDate(arbRes.data);
				const polyDataMapped = mapDataWithDate(polyRes.data);
				const bscDataMapped = mapDataWithDate(bscRes.data);
				const avaxDataMapped = mapDataWithDate(avaxRes.data);
				const opDataMapped = mapDataWithDate(opRes.data);
				const mixinDataMapped = mapDataWithDate(mixinRes.data);
				const croDataMapped = mapDataWithDate(croRes.data);
				const pulseDataMapped = mapDataWithDate(pulseRes.data);

				const mergedData = Object.keys(ethDataMapped).map((date) => ({
					date: new Date(date),
					value: ethDataMapped[date],
					value2: arbDataMapped[date] || 1,
					value3: tronDataMapped[date] || 1,
					value4: bscDataMapped[date] || 1,
					value5: polyDataMapped[date] || 1,
					value6: opDataMapped[date] || 1,
					value7: avaxDataMapped[date] || 1,
					value8: mixinDataMapped[date] || 1,
					value9: croDataMapped[date] || 1,
					value10: pulseDataMapped[date] || 1,
				}));

				setMergedData(mergedData);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return [tvlData, data, mergedData];
};

export default DataFetcher;
