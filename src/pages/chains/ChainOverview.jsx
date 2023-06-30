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
import PieChartComponent from "../../components/charts/PieChartComponent";
import { BsCoin } from "react-icons/bs";
const StablecoinPage = () => {
	const [chainData, setChainData] = useState(null);
	const [tvl, setTvl] = useState(0);
	useEffect(() => {
		axios
			.get("https://api.llama.fi/v2/chains")
			.then((res) => {
				const data = res.data;
				const updatedData = data
					.sort((a, b) => b.value - a.value)
					.map((item) => ({
						chain: item.name,
						value: item.tvl,
					}));
				const allTvl = updatedData
					.map((item) => item.value)
					.reduce((total, value) => total + value, 0);
				setTvl(allTvl);
				const othersTvl = updatedData
					.slice(100)
					.map((item) => item.value)
					.reduce((total, value) => total + value, 0);

				const slicedData = updatedData
					.sort((a, b) => b.value - a.value)
					.map((item) => item)
					.slice(0, 10);

				const mergedData = [
					...slicedData,
					{ chain: "Others", value: othersTvl },
				];
				console.log(allTvl);
				setChainData(mergedData);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<main className="mx-2 lg:mx-10 xl:mx-10">
			<Helmet>
				<title>Chains | DefiTracker</title>
				<meta
					name="description"
					content={`Learn more about chains and how they work on our website.`}
				/>
			</Helmet>

			<PricePanel />
			<SearchList />

			<div className="grid mt-4 sm:grid-cols-1 grid-cols-[50%_50%] border bg-gray-850 border-gray-600 rounded-xl">
				<div className="text-xl p-4 italic capitalize">
					<header className="text-4xl space-x-2 whitespace-pre-wrap flex capitalize">
						<p>Total Value Locked All Chains:</p>
						<p>{tvl > 0 ? numeral(tvl).format("$0,") : null}</p>
					</header>
				</div>
				<div className="grid lg:grid-col grid-flow-row h-fit text-white sm:w-full text-xl p-4 italic capitalize">
					{chainData && <PieChartComponent data={chainData} />}
				</div>
			</div>
		</main>
	);
};

export default StablecoinPage;
