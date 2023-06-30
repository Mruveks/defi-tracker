import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import axios from "axios";
import ChainsChart from "../../components/charts/ChainsChart";
import Ranking from "../../components/rankings/Ranking";
import SearchList from "../../components/SearchList";
import PricePanel from "../../components/PricePanel";
import moment from "moment";
import numeral from "numeral";
import Loader from "../../components/Loader";

const ChainPage = () => {
	const { chainId } = useParams();
	const [chains, setChains] = useState([]);
	const [lastDay, setLastDay] = useState();
	const [day, setDay] = useState();
	const [weekAgo, setWeekAgo] = useState();

	useEffect(() => {
		axios
			.get(`https://api.llama.fi/v2/historicalChainTvl/${chainId}`)
			.then((res) => {
				const data = res.data;
				console.log(data);
				const dates = data.map((item) => moment.unix(item.date).toDate());
				const values = data.map((item) => item.tvl);
				const datasource = values.map((value, index) => ({
					date: dates[index],
					value: value,
				}));
				setChains(datasource);
				console.log(chains);
				const today = datasource.slice(
					datasource.length - 1,
					datasource.length
				);
				const yesterday = datasource.slice(
					datasource.length - 2,
					datasource.length - 1
				);
				const weekAgoValue = datasource.slice(
					datasource.length - 8,
					datasource.length - 7
				);
				setLastDay(yesterday[0].value);
				setDay(today[0].value);
				setWeekAgo(weekAgoValue[0].value);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [chainId]);

	const changes = day - lastDay;
	const percentageChange = (((day - lastDay) / lastDay) * 100).toFixed(2);
	const changes_7 = day - weekAgo;
	const percentageChange_7 = (((day - weekAgo) / weekAgo) * 100).toFixed(2);

	return (
		<div className="grid grid-cols-1 text-md mx-2 lg:mx-10 xl:mx-10">
			<Helmet>
				<title>{`${
					chainId.charAt(0).toUpperCase() + chainId.slice(1)
				} | DefiTracker`}</title>
				<meta name="description" content={`${chainId}`} />
			</Helmet>

			<PricePanel />
			<SearchList />

			{chains.length ? (
				<div className="grid sm:grid-cols-1 md:grid-cols-1 grid-cols-[30%_70%] mt-4">
					<div className="grid lg:grid-col grid-flow-row space-y-8 text-white sm:w-full text-2xl p-4 bg-gray-850 rounded-l-xl italic capitalize border border-gray-600 h-full">
						<header className="text-4xl whitespace-pre-wrap flex capitalize">
							{chainId === "Binance" ? "Binance Smart Chain" : chainId}
						</header>

						<div className="grid sm:grid-cols-2 gap-10 grid-cols-1">
							<div className="grid sm:col-span-2 h-fit grid-flow-row w-fit justify-center">
								<div>Total Value Locked</div>
								<div className="text-blue-500 font-mono div">
									{numeral(day).format("$0.00a")}
								</div>
							</div>
							<div>
								<div>24h Change</div>
								{percentageChange > 0 ? (
									<div className="text-green-500 font-mono div">
										+{percentageChange}%
									</div>
								) : (
									<div className="text-red-500 font-mono div">
										{percentageChange}%
									</div>
								)}
								{changes > 0 ? (
									<div className="text-green-500 font-mono div">
										{"+" + numeral(changes).format("$0.00a")}
									</div>
								) : (
									<div className="text-red-500 font-mono div">
										{numeral(changes).format("$0.00a")}
									</div>
								)}
							</div>
							<div>
								<div>7 day Change</div>
								{percentageChange_7 > 0 ? (
									<div className="text-green-500 font-mono div">
										+{percentageChange_7}%
									</div>
								) : (
									<div className="text-red-500 font-mono div">
										{percentageChange_7}%
									</div>
								)}
								{changes_7 > 0 ? (
									<div className="text-green-500 font-mono div">
										{"+" + numeral(changes_7).format("$0.00a")}
									</div>
								) : (
									<div className="text-red-500 font-mono div">
										{numeral(changes_7).format("$0.00a")}
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="border border-gray-600 border-l-0 sm:hidden md:hidden">
						<ChainsChart />
					</div>
				</div>
			) : (
				<Loader />
			)}

			<div className="h-max my-4 text-white">
				<Ranking chain={chainId} />
			</div>
		</div>
	);
};

export default ChainPage;
