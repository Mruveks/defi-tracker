import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import axios from "axios";
import Charts from "../../components/charts/Chart";
import PricePanel from "../../components/PricePanel";
import ProtocolAddress from "../../utilities/ProtocolAddress";
import AddressFormatter from "../../utilities/AddressFormatter";
import SearchList from "../../components/SearchList";
import moment from "moment";
import numeral from "numeral";
import Loader from "../../components/Loader";
import { BsArrowUpRight } from "react-icons/bs";
import PieChart from "../../components/charts/PieChartComponent";
import { BsCoin } from "react-icons/bs";
const StablecoinPage = () => {
	const { stableId } = useParams();
	const [stables, setStables] = useState(null);
	const [extractedData, setExtractedData] = useState([]);
	const [currentCirculating, setCurrentCirculating] = useState([]);
	const [valuesArray, setValuesArray] = useState([]);
	const [tvl, setTvl] = useState(0);

	useEffect(() => {
		axios
			.get(`https://stablecoins.llama.fi/stablecoin/${stableId}`)
			.then((res) => {
				const data = res.data;
				setStables(data);
				console.log(data.tokens[394].circulating.peggedUSD);
				setTvl(data.tokens[394].circulating.peggedUSD.toFixed(2));
				const tokens = data.tokens;
				const datesAndValues = tokens.map((token) => ({
					date: token.date,
					value: Number(token.circulating.peggedUSD),
				}));
				setExtractedData(datesAndValues);
				const today = datesAndValues.slice(
					datesAndValues.length - 1,
					datesAndValues.length
				);
				const todayValue = Object.values(today);
				const value = todayValue[0].value;
				setCurrentCirculating(numeral(value).format("$0.00a"));

				const current = Object.values(data)[17];
				const values = Object.entries(current).map(([chain, value], key) => ({
					key,
					chain,
					value: value.peggedUSD,
				}));
				setValuesArray(values);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [stableId]);

	return (
		<main className="mx-2 lg:mx-10 xl:mx-10">
			{stables ? (
				<Helmet>
					<title>{stables.name} | DefiTracker</title>
					<meta
						name="description"
						content={`Learn more about ${stables.name} features and how it works on our website.`}
					/>
				</Helmet>
			) : null}

			<PricePanel />
			<SearchList />

			{stables ? (
				<div className="grid grid-cols-2 mb-4 rounded-xl">
					<div className="grid col-span-2 sm:grid-cols-1 md:grid-cols-1 grid-cols-[30%_70%] my-4">
						<div className="grid  text-white sm:w-full p-4 bg-gray-850 rounded-l-xl italic capitalize border border-gray-600 h-full">
							<div className="flex items-center not-italic sm:space-x-0 text-2xl space-x-2 w-[120%]">
								<BsCoin size={30} />
								<header className="text-4xl">
									{stables.name} ({stables.symbol})
								</header>
							</div>
							<div>
								<h1>Current Circulating</h1>
								{stables.price ? (
									<div className="font-mono">{currentCirculating}</div>
								) : (
									"-"
								)}
							</div>
							<div>
								<h1>Price</h1>
								{stables.price ? (
									<div className="font-mono">
										{numeral(stables.price).format("$0.00a")}
									</div>
								) : (
									"-"
								)}
							</div>

							<div>
								<h1>Peg Mechanism</h1>
								{stables.pegMechanism}
							</div>
						</div>

						<div className="border border-gray-600 border-l-0 sm:hidden md:hidden">
							<Charts data={extractedData} />
						</div>
					</div>

					<div className="col-span-2 bg-gray-850 grid grid-cols-2 sm:grid-cols-1 rounded-xl border border-gray-600">
						<div className="space-y-4 p-4 border-r  border-gray-600">
							<header className="text-2xl sm:text-2xl">
								Protocol Information
							</header>
							<p className="text-justify">{stables.description}</p>
							<p className="text-justify">{stables.mintRedeemDescription}</p>
							{stables.auditLinks ? (
								<div>
									<h2>Audits:</h2>
									{stables.auditLinks.map((audits, index) => (
										<a
											key={index}
											href={audits}
											target="__blank"
											className="hover:underline italic flex overflow-x-clip"
										>
											{audits}
										</a>
									))}
								</div>
							) : null}
							<div className="flex space-x-2">
								<a href={stables.url} target="_blank">
									<button className="px-4 space-x-2 flex items-center py-2 rounded bg-gray-900 w-fit hover:bg-gray-600 transition duration-300">
										<p>Website</p>
										<BsArrowUpRight className="sm:hidden" />
									</button>
								</a>
								<a href={stables.twitter} target="_blank">
									<button className="px-4 space-x-2 h-full flex items-center rounded bg-gray-900 w-fit hover:bg-gray-600 transition duration-300">
										<p>Twitter</p>
										<BsArrowUpRight className="sm:hidden" />
									</button>
								</a>
							</div>
						</div>

						<div className="space-y-4 sm:border-t border-gray-600">
							<header className="text-2xl pt-4 px-4 sm:text-2xl">
								Token Information
							</header>
							<div className="flex space-x-2 px-4 overflow-hidden">
								<p>Address: </p>
								{stables.address ? (
									<AddressFormatter address={stables.address} />
								) : (
									<p className="text-gray-600">No address available</p>
								)}
							</div>
							{stables.address !== null ? (
								<div className="items-center pb-4 px-4">
									<p>
										<ProtocolAddress address={stables.address} />
									</p>
								</div>
							) : (
								stables.address
							)}

							<div className="border-t h-fit p-4 border-gray-600">
								<header className="text-2xl sm:text-2xl">
									Token Circulation
								</header>

								<PieChart data={valuesArray} tvl={tvl} />
							</div>
						</div>
					</div>
				</div>
			) : (
				<Loader />
			)}
		</main>
	);
};

export default StablecoinPage;
