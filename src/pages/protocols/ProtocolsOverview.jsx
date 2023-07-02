import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import PricePanel from "../../components/PricePanel";
import SearchList from "../../components/SearchList";
import ProtocolsRadarChart from "../../components/charts/ProtocolsRadarChart";

const ProtocolsOverview = () => {
	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		axios
			.get("https://api.llama.fi/protocols")
			.then((res) => {
				const data = res.data;
				const categories = [
					{ subject: "dexes", count: 0, fullMark: 1000 },
					{ subject: "cex", count: 0, fullMark: 1000 },
					{ subject: "derivatives", count: 0, fullMark: 1000 },
					{ subject: "reserve currency", count: 0, fullMark: 1000 },
					{ subject: "algo-stables", count: 0, fullMark: 1000 },
					{ subject: "farm", count: 0, fullMark: 1000 },
					{ subject: "bridge", count: 0, fullMark: 1000 },
					{ subject: "gaming", count: 0, fullMark: 1000 },
					{ subject: "prediction market", count: 0, fullMark: 1000 },
					{ subject: "indexes", count: 0, fullMark: 1000 },
					{ subject: "lending", count: 0, fullMark: 1000 },
					{ subject: "yield", count: 0, fullMark: 1000 },
					{ subject: "yield aggregator", count: 0, fullMark: 1000 },
					{ subject: "cdp", count: 0, fullMark: 1000 },
					{ subject: "insurance", count: 0, fullMark: 1000 },
					{ subject: "launchpad", count: 0, fullMark: 1000 },
					{ subject: "liquidity manager", count: 0, fullMark: 1000 },
					{ subject: "payments", count: 0, fullMark: 1000 },
					{ subject: "liquid staking", count: 0, fullMark: 1000 },
					{ subject: "synthetics", count: 0, fullMark: 1000 },
					{ subject: "rwa", count: 0, fullMark: 1000 },
					{ subject: "leveraged farming", count: 0, fullMark: 1000 },
					{ subject: "services", count: 0, fullMark: 1000 },
					{ subject: "nft lending", count: 0, fullMark: 1000 },
					{ subject: "options", count: 0, fullMark: 1000 },

					{ subject: "cross chain", count: 0, fullMark: 1000 },
					{ subject: "oracle", count: 0, fullMark: 1000 },
					{ subject: "privacy", count: 0, fullMark: 1000 },
					{ subject: "staking pool", count: 0, fullMark: 1000 },
					{ subject: "options vault", count: 0, fullMark: 1000 },
					{ subject: "rwa lending", count: 0, fullMark: 1000 },
				];

				data.forEach((item) => {
					const category = categories.find(
						(cat) => cat.subject === item.category.toLowerCase()
					);
					if (category) {
						category.count += 1;
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

			<div>
				<ProtocolsRadarChart data={chartData} />
			</div>
		</main>
	);
};

export default ProtocolsOverview;
