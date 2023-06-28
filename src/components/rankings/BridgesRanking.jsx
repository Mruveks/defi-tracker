import React, { useState, useEffect } from "react";
import axios from "axios";
import numeral from "numeral";
import Loader from "../Loader";
import CalculateChange from "../../utilities/CalculateChange";
import Charts from "../charts/Chart";
import moment from "moment";

const BridgesRanking = () => {
	const [bridges, setBridges] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [lastItem, setLastItem] = useState([]);
	const [lastDate, setLastDate] = useState();
	useEffect(() => {
		axios
			.get("https://bridges.llama.fi/bridges?includeChains=true")
			.then((res) => {
				setBridges(res.data.bridges);
				console.log(res);
			})
			.catch((err) => console.log(err));
		axios
			.get("https://bridges.llama.fi/bridgevolume/all?id=5")
			.then((res) => {
				const data = res.data;
				const updateData = data.map((item) => ({
					date: item.date,
					depositUSD: item.depositUSD,
					withdrawUSD: item.withdrawUSD,
					value: item.depositUSD - item.withdrawUSD,
					depositTxs: item.depositTxs,
					withdrawTxs: item.withdrawTxs,
					txDiff: item.depositTxs - item.withdrawTxs,
				}));
				const last = updateData.slice(updateData.length - 1);

				setChartData(updateData);
				setLastItem(last);
				setLastDate(moment.unix(last[0].date));
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<>
			<div className="grid mb-4 sm:grid-cols-1 grid-cols-[25%_75%] border border-gray-600 rounded-xl p-4">
				<div className="space-y-8 h-fit text-white sm:w-full italic capitalize">
					<header className="text-4xl">
						Bridges <br /> Outflows vs Inflows
					</header>
					{lastItem && lastItem[0] ? (
						<div className="space-y-4">
							<span className="flex space-x-2">
								<h1>Last data entry:</h1>
								<p>{lastDate.format("DD.MM.YYYY")}</p>
							</span>

							<div>
								<span className="flex space-x-2">
									<h1>Outgoing Transactions:</h1>
									<p>{lastItem[0].withdrawTxs}</p>
								</span>
								<span className="flex space-x-2">
									<h1>Outgoing Transactions Value:</h1>
									<p>-{numeral(lastItem[0].withdrawUSD).format("$0,0.0")}</p>
								</span>
							</div>
							<div>
								<span className="flex space-x-2">
									<h1>Incoming Transactions:</h1>
									<p>{lastItem[0].depositTxs}</p>
								</span>{" "}
								<span className="flex space-x-2">
									<h1>Incoming Transactions Value:</h1>
									<p>{numeral(lastItem[0].depositUSD).format("$0,0.0")}</p>
								</span>
							</div>
						</div>
					) : null}
				</div>
				<div className="grid lg:grid-col grid-flow-row space-y-8 h-fit text-white sm:w-full text-2xl p-4 italic capitalize">
					<Charts data={chartData} options="bridge" />
				</div>
			</div>
			<div className="h-max border text-md rounded-xl border-gray-600 p-2">
				<div className="grid grid-cols-5 text-lg sm:grid-cols-3 font-semibold sm:text-sm p-2 text-right capitalize italic">
					<header className="text-left">Name</header>
					<header>Chain</header>
					<header className="sm:hidden block">1d volume change</header>
					<header className="sm:hidden block">Today's Volume</header>
					<header>Monthly Volume</header>
				</div>
				{bridges ? (
					bridges
						.filter((bridge) => bridge.currentDayVolume > 1000)
						.map((bridge, index) => (
							<div
								className={`${
									index % 2 === 0 ? "bg-[#222f3e]" : "bg-gray-800"
								} grid grid-cols-5 sm:grid-cols-3 items-center rounded-xl text-right my-2 px-2`}
								key={index}
							>
								<div className="my-2 text-left">
									<h2 className="text-blue-400">{bridge.displayName}</h2>
								</div>

								<div className="capitalize">{bridge.name}</div>

								<div className="sm:hidden block">
									<CalculateChange
										lastDay={bridge.dayBeforeLastVolume}
										today={bridge.volumePrevDay}
									/>
								</div>

								<div className="sm:hidden block font-mono">
									{numeral(bridge.currentDayVolume).format("$0.00a")}
								</div>

								<div className="font-mono">
									{numeral(bridge.monthlyVolume).format("$0.00a")}
								</div>
							</div>
						))
				) : (
					<Loader />
				)}
			</div>
		</>
	);
};

export default BridgesRanking;
