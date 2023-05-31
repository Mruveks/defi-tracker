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
				const dates = stables.map((item) => moment.unix(item.date).toDate());
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
				<div className="grid sm:grid-cols-1 grid-cols-[25%_75%] border border-gray-600 rounded-xl">
					<div className="space-y-8 h-fit text-white sm:w-full text-2xl p-4 italic capitalize">
						<div className="col-span-2 my-4 flex items-center not-italic sm:space-x-0 text-2xl space-x-4 w-[110%]">
							<header className="whitespace-pre-wrap flex">Stablecoins</header>
						</div>
						<div className="grid sm:grid-cols-2 gap-10 grid-cols-1">
							<div className="grid h-fit grid-flow-row w-fit justify-center sm:col-span-2">
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
								{dollarChange > 0 ? (
									<div className="text-green-500 font-mono">
										{"+" + numeral(dollarChange).format("$0.00a")}
									</div>
								) : (
									<div className="text-red-500 font-mono">
										{numeral(dollarChange).format("$0.00a")}
									</div>
								)}
							</div>
							<div className="grid h-fit grid-flow-row w-full py-4">
								<div>7 day Change</div>
								{percentageChange_7d > 0 ? (
									<div className="text-green-500 font-mono">
										+{percentageChange_7d}%
									</div>
								) : (
									<div className="text-red-500 font-mono">
										{percentageChange_7d}%
									</div>
								)}
								{dollarChange_7d > 0 ? (
									<div className="text-green-500 font-mono">
										{"+" + numeral(dollarChange_7d).format("$0.00a")}
									</div>
								) : (
									<div className="text-red-500 font-mono">
										{numeral(dollarChange_7d).format("$0.00a")}
									</div>
								)}
							</div>
						</div>
					</div>

					<div className="flex py-4">
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
