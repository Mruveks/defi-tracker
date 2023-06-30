import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import numeral from "numeral";
import moment from "moment";
import Charts from "./Chart";

const StablesTVLchart = () => {
	const [stable, setStables] = useState([]);
	const [lastDay, setLastDay] = useState();
	const [day, setDay] = useState();
	const [weekAgo, setWeekAgo] = useState();

	useEffect(() => {
		axios
			.get("https://stablecoins.llama.fi/stablecoincharts/all?stablecoin=1")
			.then((res) => {
				const stables = res.data;
				const dates = stables.map((item) => item.date);
				const totalCirculating = stables.map(
					(item) => item.totalCirculatingUSD
				);
				const totalPegged = totalCirculating.map((item) => item.peggedUSD);
				const datasource = totalPegged.map((value, index) => ({
					date: dates[index],
					value,
				}));

				setStables(datasource);

				setLastDay(datasource[767].value);
				setDay(datasource[768].value);
				setWeekAgo(datasource[761].value);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const dollarChange = (day - lastDay).toFixed(2);
	const percentageChange = (((day - lastDay) / lastDay) * 100).toFixed(2);

	const dollarChange_7d = (day - weekAgo).toFixed(2);
	const percentageChange_7d = (((day - weekAgo) / weekAgo) * 100).toFixed(2);

	return (
		<>
			{stable.length ? (
				<div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 grid-cols-[30%_70%] rounded-xl overflow-hidden border border-gray-600">
					<div className="space-y-4 text-white sm:w-full text-xl p-4 bg-gray-850 italic capitalize h-full">
						<header className="text-4xl whitespace-pre-wrap flex">
							Stablecoins
						</header>
						<div className="grid ">
							<div className="flex justify-between">
								<div>Total Value Locked</div>
								<div className="text-blue-500 font-mono">
									{numeral(day).format("$0.00a")}
								</div>
							</div>
							<div className="flex justify-between">
								<div>24h Change</div>
								<div className="flex space-x-2">
									{dollarChange > 0 ? (
										<div className="text-green-500 font-mono flex items-center">
											{"+" + numeral(dollarChange).format("$0.00a")}
										</div>
									) : (
										<div className="text-red-500 font-mono flex items-center">
											{numeral(dollarChange).format("$0.00a")}
										</div>
									)}
									{percentageChange > 0 ? (
										<div className="text-green-500 font-mono text-lg">
											+{percentageChange}%
										</div>
									) : (
										<div className="text-red-500 font-mono text-lg">
											{percentageChange}%
										</div>
									)}
								</div>
							</div>

							<div className="flex justify-between">
								<div>7 day Change</div>
								<div className="flex space-x-2">
									{dollarChange_7d > 0 ? (
										<div className="text-green-500 font-mono">
											{"+" + numeral(dollarChange_7d).format("$0.00a")}
										</div>
									) : (
										<div className="text-red-500 font-mono">
											{numeral(dollarChange_7d).format("$0.00a")}
										</div>
									)}
									{percentageChange_7d > 0 ? (
										<div className="text-green-500 font-mono flex items-center text-lg">
											+{percentageChange_7d}%
										</div>
									) : (
										<div className="text-red-500 font-mono flex items-center text-lg">
											{percentageChange_7d}%
										</div>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className="border-gray-600 border-t xl:border-l xl:border-t-0">
						<Charts data={stable} />
					</div>
				</div>
			) : (
				<Loader />
			)}
		</>
	);
};

export default StablesTVLchart;
