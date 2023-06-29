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
	const [change, setChange] = useState(0);
	const [changeTxs, setChangeTxs] = useState(0);
	const [changeTxsValue, setChangeTxsValue] = useState(0);
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

				const yesterday = updateData.slice(updateData.length - 2);
				const changeData = yesterday[0];
				const change = changeData.depositUSD - changeData.withdrawUSD;
				const yesterdayVsTodayChange = (change / updateData[0].value) * 100;

				const changeTxs = changeData.depositTxs - changeData.withdrawTxs;
				const yesterdayVsTodayChangeTxs =
					(changeTxs / updateData[0].value) * 100;
				console.log(changeTxs);

				setChange(yesterdayVsTodayChange);
				setChangeTxsValue(changeTxs);
				setChangeTxs(yesterdayVsTodayChangeTxs);
				setChartData(updateData);
				setLastItem(last);
				setLastDate(moment.unix(last[0].date));
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<>
			<div className="grid mb-4 sm:grid-cols-1 grid-cols-[30%_70%]">
				<div className="space-y-8 h-full p-4 text-white sm:w-full italic capitalize border border-gray-600 bg-gray-850 rounded-l-xl">
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
									<h1>Transacion difference:</h1>
									<p>{changeTxsValue}</p>
									<span className="flex text-xs items-center">
										(
										{changeTxs > 0 ? (
											<p className="text-green-400">+{changeTxs.toFixed(4)}%</p>
										) : (
											<p className="text-red-400">-{changeTxs.toFixed(2)}%</p>
										)}
										)
									</span>
								</span>
								<span className="flex space-x-2">
									<h1>Transacion Value difference:</h1>
									<p>{numeral(lastItem[0].value).format("$0,0.0")}</p>
									<span className="flex text-xs items-center">
										(
										{change > 0 ? (
											<p className="text-green-400">+{change.toFixed(2)}%</p>
										) : (
											<p className="text-red-400">-{change.toFixed(2)}%</p>
										)}
										)
									</span>
								</span>
							</div>
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
				<div className="border border-l-0 rounded-r-xl border-gray-600">
					<Charts data={chartData} options="bridge" />
				</div>
			</div>

			<div className="grid space-y-4 my-4 border bg-gray-850 border-gray-600 rounded-xl p-4">
				<header className="text-2xl">What is Bridge?</header>
				<p className="text-justify">
					To understand what a blockchain bridge is, you need to first
					understand what a blockchain is. Bitcoin, Ethereum, and BNB Smart
					Chain are some of the major blockchain ecosystems, all relying on
					different consensus protocols, programming languages, and system
					rules. <br />
					<br /> A blockchain bridge is a protocol connecting two economically
					and technologically separate blockchains to enable interactions
					between them. These protocols function like a physical bridge linking
					one island to another, with the islands being separate blockchain
					ecosystems. As the blockchain space developed and expanded, one of the
					most significant limitations has been the lack of capacity of
					different blockchains to work together. Each blockchain has its own
					rules, tokens, protocols, and smart contracts. <br />
					<br /> Blockchain bridges help break up these silos and bring the
					isolated crypto ecosystems together. An interconnected network of
					blockchains can allow tokens and data to be exchanged between them
					smoothly.
				</p>
			</div>

			<div className="h-max border text-md rounded-xl bg-gray-850 border-gray-600 p-2">
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
									index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"
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
