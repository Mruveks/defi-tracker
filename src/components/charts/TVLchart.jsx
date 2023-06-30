import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import numeral from "numeral";
import Charts from "./Chart";
import { TiArrowDown, TiArrowUp } from "react-icons/ti";

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
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 grid-cols-[30%_70%] rounded-xl overflow-hidden border border-gray-600">
          
					<div className="space-y-4 text-white sm:w-full text-xl p-4 bg-gray-850 italic capitalize h-full">
						<header className="text-4xl whitespace-pre-wrap flex">DeFi</header>
						<div className="grid grid-cols-1">
							<div className="flex w-full justify-between">
								<div>Total Value Locked</div>
								<div className="text-blue-500 font-mono">
									{numeral(day).format("$0.00a")}
								</div>
							</div>
							<div className="flex w-full justify-between">
								<div>24h Change</div>
								<div className="flex space-x-2">
									{changes > 0 ? (
										<div className="text-green-500 font-mono">
											{"+" + numeral(changes).format("$0.00a")}
										</div>
									) : (
										<div className="text-red-500 font-mono ">
											{numeral(changes).format("$0.00a")}
										</div>
									)}
									{percentageChange > 0 ? (
										<div className="text-green-500 font-mono flex items-center text-lg">
											<TiArrowUp />
											<p>{percentageChange}%</p>
										</div>
									) : (
										<div className="text-red-500 font-mono flex items-center text-lg">
											<TiArrowDown />
											{percentageChange.slice(1)}%
										</div>
									)}
								</div>
							</div>
							<div className="flex w-full justify-between">
								<div>7 day Change</div>
								<div className="flex space-x-2">
									{changes2 > 0 ? (
										<div className="text-green-500 font-mono ">
											{"+" + numeral(changes2).format("$0.00a")}
										</div>
									) : (
										<div className="text-red-500 font-mono">
											{numeral(changes2).format("$0.00a")}
										</div>
									)}
									{percentageChange2 > 0 ? (
										<div className="text-green-500 font-mono flex items-center text-lg">
											<TiArrowUp />
											{percentageChange2}%
										</div>
									) : (
										<div className="text-red-500 font-mono flex items-center text-lg">
											<TiArrowDown />
											{percentageChange2.slice(1)}%
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
					
          <div className="border-gray-600 border-t xl:border-l xl:border-t-0">
						<Charts data={mergedData} />
					</div>
				</div>
			) : (
				<Loader />
			)}
		</>
	);
};

export default TVLchart;
