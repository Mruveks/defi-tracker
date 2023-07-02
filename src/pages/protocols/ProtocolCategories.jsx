import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import PricePanel from "../../components/PricePanel";
import SearchList from "../../components/SearchList";
import ProtocolsRadarChart from "../../components/charts/ProtocolsRadarChart";
import ProtocolOverviewRanking from "../../components/rankings/ProtocolOverviewRanking";

const ProtocolCategories = () => {
	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		axios
			.get("https://api.llama.fi/protocols")
			.then((res) => {
				const data = res.data;
				console.log(data);
				const categories = [
					{
						subject: "dexes",
						count: 0,
						tvl: 0,
						description: "Protocols where you can swap/trade cryptocurrency",
					},
					{
						subject: "derivatives",
						count: 0,
						tvl: 0,
						description: "Protocols for betting with leverage",
					},
					{
						subject: "reserve currency",
						count: 0,
						tvl: 0,
						description:
							"OHM forks: Protocols that uses a reserve of valuable assets acquired through bonding and staking to issue and back its native token",
					},
					{
						subject: "algo-stables",
						count: 0,
						tvl: 0,
						description:
							"Protocols that provide algorithmic coins to stablecoins",
					},
					{
						subject: "farm",
						count: 0,
						tvl: 0,
						description:
							"Protocols that allow users to lock money in exchange for a protocol token",
					},
					{
						subject: "bridge",
						count: 0,
						tvl: 0,
						description:
							"Protocols that bridge tokens from one network to another",
					},
					{
						subject: "gaming",
						count: 0,
						tvl: 0,
						description: "Protocols that have gaming components",
					},
					{
						subject: "prediction market",
						count: 0,
						tvl: 0,
						description:
							"Protocols that allow you to wager/bet/buy in future results          ",
					},
					{
						subject: "indexes",
						count: 0,
						tvl: 0,
						description:
							"Protocols that have a way to track/created the performance of a group of related assets",
					},
					{
						subject: "lending",
						count: 0,
						tvl: 0,
						description: "Protocols that allow users to borrow and lend assets",
					},
					{
						subject: "yield",
						count: 0,
						tvl: 0,
						description:
							"Protocols that pay you a reward for your staking/LP on their platform",
					},
					{
						subject: "yield aggregator",
						count: 0,
						tvl: 0,
						description:
							"Protocols that aggregated yield from diverse protocols",
					},
					{
						subject: "cdp",
						count: 0,
						tvl: 0,
						description:
							"Protocols that mint its own stablecoin using collateralized lending",
					},
					{
						subject: "insurance",
						count: 0,
						tvl: 0,
						description:
							"Protocols that are designed to provide monetary protections",
					},
					{
						subject: "launchpad",
						count: 0,
						tvl: 0,
						description: "Protocols that launch new projects and coins",
					},
					{
						subject: "liquidity manager",
						count: 0,
						tvl: 0,
						description:
							"Protocols that manage Liquidity Positions in concentrated liquidity AMMs",
					},
					{
						subject: "payments",
						count: 0,
						tvl: 0,
						description:
							"Protocols that offer the ability to pay/send/receive cryptocurrency",
					},
					{
						subject: "liquid staking",
						count: 0,
						tvl: 0,
						description:
							"Protocols that enable you to earn staking rewards on your tokens while also providing a tradeable and liquid receipt for your staked position",
					},
					{
						subject: "synthetics",
						count: 0,
						tvl: 0,
						description:
							"Protocol that created a tokenized derivative that mimics the value of another asset",
					},
					{
						subject: "rwa",
						count: 0,
						tvl: 0,
						description:
							"Protocols that involve Real World Assets, such as house tokenization",
					},
					{
						subject: "leveraged farming",
						count: 0,
						tvl: 0,
						description:
							"Protocols that allow you to leverage yield farm with borrowed money",
					},
					{
						subject: "services",
						count: 0,
						tvl: 0,
						description: "Protocols that provide a service to the user",
					},
					{
						subject: "nft lending",
						count: 0,
						tvl: 0,
						description: "Protocols where users can buy/sell/rent NFTs",
					},
					{
						subject: "options",
						count: 0,
						tvl: 0,
						description:
							"Protocols that give you the right to buy an asset at a fixed price",
					},

					{
						subject: "cross chain",
						count: 0,
						tvl: 0,
						description:
							"Protocols that add interoperability between different blockchains",
					},
					{
						subject: "oracle",
						count: 0,
						tvl: 0,
						description:
							"Protocols that connect data from the outside world (off-chain) with the blockchain world (on-chain)",
					},
					{
						subject: "privacy",
						count: 0,
						tvl: 0,
						description:
							"Protocols that have the intention of hiding information about transactions",
					},
					{
						subject: "staking pool",
						count: 0,
						tvl: 0,
						description:
							"Refers to platforms where users stake their assets on native blockchains to help secure the network and earn rewards",
					},
					{
						subject: "options vault",
						count: 0,
						tvl: 0,
						description:
							"Protocols that allow you to deposit collateral into an options strategy",
					},
					{
						subject: "rwa lending",
						count: 0,
						tvl: 0,
						description:
							"Protocols that bridge traditional finance and blockchain ecosystems by tokenizing real-world assets for use as collateral or credit assessment",
					},
				];

				data.forEach((item) => {
					const category = categories.find(
						(cat) => cat.subject === item.category.toLowerCase()
					);
					if (category) {
						category.count += 1;
						if (item.tvl) {
							category.tvl = (category.tvl || 0) + item.tvl;
						}
					}
				});

				categories.sort((a, b) => b.count - a.count);
				setChartData(categories);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<main className="mx-2 lg:mx-10 xl:mx-10">
			<Helmet>
				<title>Protocols | DefiTracker</title>
				<meta
					name="description"
					content={`Learn more about crypto protocols and how they work on our website.`}
				/>
			</Helmet>

			<PricePanel />
			<SearchList />
			<ProtocolsRadarChart data={chartData} />

			<ProtocolOverviewRanking data={chartData} />
		</main>
	);
};

export default ProtocolCategories;
