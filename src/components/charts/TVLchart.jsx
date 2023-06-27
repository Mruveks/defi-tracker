import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import numeral from "numeral";
import moment from "moment";
import Charts from "./Chart";
const TVLchart = () => {
	const [chartData, setChartData] = useState([]);
	const [volumeData, setVolumeData] = useState([]);
	const [day, setDay] = useState();
	const [lastDay, setLastDay] = useState();
	const [weekAgo, setWeekAgo] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const historicalTvlRes = await axios.get(
					"https://api.llama.fi/v2/historicalChainTvl"
				);
				const data = historicalTvlRes.data;
				const datasource = data.map(({ date, tvl }) => ({
					date,
					value: tvl,
				}));
				setChartData(datasource);

				const today = datasource[datasource.length - 1]?.value || 0;
				const yesterday = datasource[datasource.length - 2]?.value || 0;
				const weekAgo = datasource[datasource.length - 8]?.value || 0;
				setLastDay(yesterday);
				setDay(today);
				setWeekAgo(weekAgo);

				const dailyVolumeRes = await axios.get(
					"https://api.llama.fi/overview/dexs?excludeTotalDataChart=false&excludeTotalDataChartBreakdown=true&dataType=dailyVolume"
				);
				const volumeData = dailyVolumeRes.data.totalDataChart.map(
					([date, volume]) => ({
						date: parseInt(date),
						volume,
					})
				);
				setVolumeData(volumeData);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	const mergedData = chartData.map((item) => {
		const volumeItem = volumeData.find((vItem) => {
			return parseInt(vItem.date) === parseInt(item.date);
		});

		return {
			...item,
			...volumeItem,
		};
	});

	const changes = day - lastDay;
	const percentageChange = (((day - lastDay) / lastDay) * 100).toFixed(2);
	const changes2 = day - weekAgo;
	const percentageChange2 = (((day - weekAgo) / weekAgo) * 100).toFixed(2);

	return (
		<>
			{chartData.length ? (
				<div className="flex flex-col lg:flex-row">
					<div className="grid sm:grid-cols-1 grid-cols-[25%_75%] border border-gray-600 rounded-xl">
						<div className="grid lg:grid-col grid-flow-row space-y-8 h-fit text-white sm:w-full text-2xl p-4 italic capitalize">
							<div className="my-4 flex items-center not-italic sm:space-x-0 text-2xl space-x-4 w-[110%]">
								<header className="text-4xl whitespace-pre-wrap flex">
									DeFi
								</header>
							</div>
							<div className="grid sm:grid-cols-2 gap-10 grid-cols-1">
								<div className="grid sm:col-span-2 h-fit grid-flow-row w-fit justify-center">
									<div>Total Value Locked</div>
									<div className="text-blue-500 font-mono">
										{numeral(day).format("$0.00a")}
									</div>
								</div>
								<div>
									<div>24h Change</div>
									{percentageChange > 0 ? (
										<div className="text-green-500 font-mono">
											+{percentageChange}%
										</div>
									) : (
										<div className="text-red-500 font-mono">
											{percentageChange}%
										</div>
									)}
									{changes > 0 ? (
										<div className="text-green-500 font-mono">
											{"+" + numeral(changes).format("$0.00a")}
										</div>
									) : (
										<div className="text-red-500 font-mono">
											{numeral(changes).format("$0.00a")}
										</div>
									)}
								</div>
								<div>
									<div>7 day Change</div>
									{percentageChange2 > 0 ? (
										<div className="text-green-500 font-mono">
											+{percentageChange2}%
										</div>
									) : (
										<div className="text-red-500 font-mono">
											{percentageChange2}%
										</div>
									)}
									{changes2 > 0 ? (
										<div className="text-green-500 font-mono">
											{"+" + numeral(changes2).format("$0.00a")}
										</div>
									) : (
										<div className="text-red-500 font-mono">
											{numeral(changes2).format("$0.00a")}
										</div>
									)}
								</div>
							</div>
						</div>
						<div className="w-full h-full justify-end flex py-4">
							<Charts data={mergedData} />
						</div>
					</div>
				</div>
			) : (
				<Loader />
			)}
		</>
	);
};

export default TVLchart;
