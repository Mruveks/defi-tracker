import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import SearchList from "../../components/SearchList";
import moment from "moment";
import { Helmet } from "react-helmet";
import ProtocolsChart from "../../components/charts/ProtocolsChart";
import Loader from "../../components/Loader";
import numeral from "numeral";
import ProtocolAddress from "../../utilities/ProtocolAddress";
import { BsArrowUpRight } from "react-icons/bs";
import AddressFormatter from "../../utilities/AddressFormatter";
import PricePanel from "../../components/PricePanel";
import PieChartComponent from "../../components/charts/PieChartComponent";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { TiArrowDown, TiArrowUp } from "react-icons/ti";

const ProtocolPage = () => {
	const { protocolId } = useParams();
	const [protocolData, setProtocolData] = useState([]);
	const [tvl, setTvl] = useState();
	const [pieData, setPieData] = useState([]);
	const [showMessage, setShowMessage] = useState(false);
	const [otherChains, setOtherChains] = useState(false);

	let timeout;
	let formattedProtocolId = protocolId.replace(/ /g, "-").toLowerCase();

	useEffect(() => {
		axios
			.get(`https://api.llama.fi/protocol/${formattedProtocolId}`)
			.then((res) => {
				const data = [res.data];
				setProtocolData(data);
				const values = Object.entries(data[0].currentChainTvls)
					.map(([chain, value], key) => ({
						key,
						chain,
						value: value,
					}))
					.filter(
						(item) =>
							!item.chain.includes("staking") &
							!item.chain.includes("pool2") &
							!item.chain.includes("borrowed")
					);
				setPieData(values);

				if (data[0].tvl.length > 0) {
					const total = data[0].tvl;
					const lastElement = total[total.length - 1];
					setTvl(lastElement.totalLiquidityUSD);
				}
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [formattedProtocolId]);

	const renderRaises = (raise, index) => (
		<div key={index}>
			<p>
				{moment.unix(raise.date).toDate().toLocaleString()}: {raise.round} - $
				{raise.amount}m
			</p>
		</div>
	);

	const handleHover = () => {
		setShowMessage(true);
	};

	const handleLeave = () => {
		setTimeout(() => {
			setShowMessage(false);
		}, 1000);
	};
	const handleShowOtherChains = () => {
		setOtherChains(!otherChains);
	};
	useEffect(() => {
		return () => {
			clearTimeout(timeout);
		};
	}, []);

	const renderInvestors = (investors) => (
		<div className="grid text-lg text-gray-400 italic">
			{investors.map((investor, index) => (
				<div key={index} className={`rounded-xl py-1 capitalize`}>
					{investor}
				</div>
			))}
		</div>
	);

	return (
		<main className="mx-2 lg:mx-10 xl:mx-10">
			<Helmet>
				<title>
					{protocolId.charAt(0).toUpperCase() + protocolId.slice(1)} |
					DefiTracker
				</title>
				<meta
					name="description"
					content={`Learn more about ${protocolId} features and how it works on our website.`}
				/>
			</Helmet>

			<PricePanel />
			<SearchList />

			{protocolData.length ? (
				<div className="grid grid-cols-2 mb-4 rounded-xl">
					<div className="grid col-span-2 sm:grid-cols-1 md:grid-cols-1 grid-cols-[30%_70%] my-4">
						{protocolData.map((protocol, index) => (
							<div
								key={index}
								className="space-y-8 text-white sm:w-full text-xl p-4 bg-gray-850 rounded-l-xl capitalize border border-gray-600 h-full"
							>
								<div className="col-span-2 my-4 flex items-center not-italic sm:space-x-0 space-x-4 w-[110%]">
									<header className="text-4xl whitespace-pre-wrap flex items-center">
										<img
											src={protocolData[0].logo}
											alt={protocolId}
											className="sm:hidden h-8 w-8 mr-2 rounded-full"
										/>
										<p>
											{protocolId} ({protocol.symbol})
										</p>
									</header>
								</div>
								<div className="grid">
									<div className="flex justify-between">
										<h1>Total Value Locked</h1>
										{tvl > 0 ? (
											<p className="font-mono">
												{numeral(tvl).format("$0.00a")}
											</p>
										) : (
											<div>-</div>
										)}
									</div>
									{protocol.mcap > 0 ? (
										<>
											<div className="flex justify-between">
												<h1>Market Cap</h1>
												<p className="font-mono">
													{numeral(protocol.mcap).format("$0.00a")}
												</p>
											</div>

											<div className="flex justify-between">
												<h1>Mcap/TVL</h1>
												<p className="font-mono">
													{(protocol.mcap / tvl).toFixed(2)}
												</p>
											</div>
										</>
									) : (
										<>
											<div className="flex justify-between">
												<h1>Market Cap</h1>
												<p>-</p>
											</div>
											<div className="flex justify-between">
												<h1>mcap/TVL</h1>
												<p>-</p>
											</div>
										</>
									)}
								</div>

								<div className="grid">
									<div className=" w-full flex justify-between">
										<h1>Native Chain</h1>
										<Link
											to={`/chain/${protocol.chain.toLowerCase()}`}
											className="hover:underline"
										>
											{protocol.chain}
										</Link>
									</div>
									{protocol.chains.length > 1 ? (
										<div className="">
											<span
												className="flex justify-between items-center cursor-pointer"
												onClick={() => handleShowOtherChains()}
											>
												<h1>Other Chains</h1>
												{otherChains === true ? <TiArrowUp /> : <TiArrowDown />}
											</span>
											{protocol.chains.length > 0 ? (
												<div
													className={`text-left justify-items-end ${
														protocol.chains.length > 10
															? "overflow-y-scroll"
															: ""
													} max-h-72 ${
														otherChains === true ? "grid" : "hidden"
													}`}
												>
													{protocol.chains
														.filter((chain) => chain != protocol.chain)
														.map((chain, index) => (
															<div
																key={index}
																className={`w-full ${
																	index % 2 === 0
																		? "bg-gray-800"
																		: "bg-gray-850"
																}`}
															>
																<Link
																	to={`/chain/${chain.toLowerCase()}`}
																	className="hover:underline"
																>
																	{chain}
																</Link>
															</div>
														))}
												</div>
											) : (
												<p>{protocol.chain}</p>
											)}
										</div>
									) : null}
								</div>
							</div>
						))}
						<div className="border border-gray-600 border-l-0 sm:hidden md:hidden">
							<ProtocolsChart />
						</div>
					</div>

					{protocolData.map((protocol, index) => (
						<div
							key={index}
							className="col-span-2  grid grid-cols-2 sm:grid-cols-1 rounded-xl border bg-gray-850 border-gray-600"
						>
							<div className="space-y-4 p-4 border-r  border-gray-600">
								<header className="text-2xl sm:text-2xl">
									Protocol Information
								</header>
								<p className="text-justify">{protocol.description}</p>
								<p>Category: {protocol.category}</p>
								{protocol.listedAt ? (
									<p>
										Created at:{" "}
										{moment.unix(protocol.listedAt).toDate().toLocaleString()}
									</p>
								) : null}
								{protocol.audit_links ? (
									<div>
										<h2 cl>Audits:</h2>
										{protocol.audit_links.map((audits) => (
											<a
												href={audits}
												target="__blank"
												className="hover:underline italic flex overflow-x-clip whitespace-nowrap w-fit"
											>
												{audits}
											</a>
										))}
									</div>
								) : null}
								<div className="flex space-x-2">
									<a href={protocol.url} target="_blank">
										<button className="px-4 space-x-2 flex items-center py-2 rounded bg-gray-900 w-fit hover:bg-gray-600 transition duration-300">
											<p>Website</p>
											<BsArrowUpRight className="sm:hidden" />
										</button>
									</a>
									<a
										href={`https://twitter.com/${protocol.twitter}`}
										target="_blank"
									>
										<button className="px-4 space-x-2 h-full flex items-center rounded bg-gray-900 w-fit hover:bg-gray-600 transition duration-300">
											<p>Twitter</p>
											<BsArrowUpRight className="sm:hidden" />
										</button>
									</a>
								</div>

								{protocol.raises && protocol.raises.length > 0 && (
									<div className="space-y-12 pt-6">
										<div>
											<header className="text-2xl sm:text-2xl mb-2">
												Raises
											</header>
											<div className="font-mono space-y-4">
												{protocol.raises.map(renderRaises)}
											</div>
										</div>
										<div className="grid gap-20 grid-cols-2">
											<div>
												<header className="text-2xl sm:text-2xl mb-2">
													Lead Investors
												</header>
												{protocol.raises.map((raise, index) => (
													<div key={index}>
														{renderInvestors(raise.leadInvestors)}
													</div>
												))}
											</div>
											<div>
												<header className="text-2xl sm:text-2xl mb-2">
													Other Investors
												</header>
												{protocol.raises.map((raise, index) => (
													<>
														{raise.otherInvestors.length > 0 ? (
															<div key={index}>
																{renderInvestors(raise.otherInvestors)}
															</div>
														) : null}
													</>
												))}
											</div>
										</div>
									</div>
								)}
							</div>

							<div className="space-y-4 py-4 sm:border-t border-gray-600">
								<div className="px-4 space-y-4">
									<header className="text-2xl sm:text-2xl">
										Token Information
									</header>
									<div className="flex space-x-2 overflow-hidden">
										<p>Address: </p>
										{protocol.address ? (
											<AddressFormatter address={protocol.address} />
										) : (
											<p className="text-gray-600">No address available</p>
										)}
									</div>
									{protocol.address !== null ? (
										<div className="flex space-x-2 items-center">
											<p>
												<a
													href={`https://www.coingecko.com/en/coins/${protocol.gecko_id}`}
													target="_blank"
													rel="noopener noreferrer"
												>
													<button className="flex space-x-2 items-center px-4 py-2 rounded bg-gray-900 w-fit hover:bg-gray-600 transition duration-300">
														<p>View on CoinGecko</p>
														<BsArrowUpRight className="sm:hidden" />
													</button>
												</a>
											</p>
											<p>
												<ProtocolAddress address={protocol.address} />
											</p>
										</div>
									) : null}
								</div>
								<div className="border-t border-gray-600 px-4">
									<header className="text-2xl py-4 sm:text-2xl">
										Token Circulation
									</header>
									<PieChartComponent data={pieData} tvl={tvl} />
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<Loader />
			)}
		</main>
	);
};

export default ProtocolPage;
