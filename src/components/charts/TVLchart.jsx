import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import numeral from "numeral";
import moment from "moment";
import Charts from "./Chart";
const TVLchart = () => {
	const [chartData, setChartData] = useState([]);
	const [day, setDay] = useState();
	const [lastDay, setLastDay] = useState();
	const [weekAgo, setWeekAgo] = useState();

	useEffect(() => {
		axios
			.get("https://api.llama.fi/v2/historicalChainTvl")
			.then((res) => {
				const data = res.data;
				const dates = data.map((item) => moment.unix(item.date).toDate());
				const values = data.map((item) => item.tvl);
				const datasource = values.map((value, index) => ({
					date: dates[index],
					value: value,
				}));
				setChartData(datasource);
				const today = datasource.slice(
					datasource.length - 1,
					datasource.length
				);
				const yesterday = datasource.slice(
					datasource.length - 2,
					datasource.length - 1
				);
				const weekAgo = datasource.slice(
					datasource.length - 8,
					datasource.length - 7
				);
				setLastDay(yesterday[0].value);
				setDay(today[0].value);
				setWeekAgo(weekAgo[0].value);
				console.log(weekAgo);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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
								<header className="whitespace-pre-wrap flex">DeFi</header>
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
							<Charts data={chartData} />
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
