import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import PricePanel from "../../components/PricePanel";
import SearchList from "../../components/SearchList";
import numeral from "numeral";
import TopChainsChart from "../../components/charts/TopChainsChart";
import PieChartComponent from "../../components/charts/PieChartComponent";

const StablecoinPage = () => {
	const [chainData, setChainData] = useState(null);
	const [tvl, setTvl] = useState(0);
	const [ethData, setEthData] = useState([]);
	const [tronData, setTronData] = useState([]);
  const [arbData, setArbData] = useState([]);
  
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

				console.log(data);
				setChainData(mergedData);
			})
			.catch((err) => {
				console.log(err);
			});
		axios
			.get("https://api.llama.fi/v2/historicalChainTvl/Ethereum")
			.then((res) => {
				const data = res.data;
				const ethData = data.map((element) => ({
					date: element.date,
					value: element.tvl,
				}));
				setEthData(ethData);
				console.log(ethData);
			});
		axios.get("https://api.llama.fi/v2/historicalChainTvl/Tron").then((res) => {
			const data = res.data;
			const tronData = data.map((element) => ({
				date: element.date,
				value: element.tvl,
			}));
			setTronData(tronData);
			console.log(tronData);
		});
		axios
			.get("https://api.llama.fi/v2/historicalChainTvl/Arbitrum")
			.then((res) => {
				const data = res.data;
				const arbData = data.map((element) => ({
					date: element.date,
					value: element.tvl,
				}));
				setArbData(arbData);
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

			<div className="grid mt-4 sm:grid-cols-1 grid-cols-[40%_60%] border bg-gray-850 border-gray-600 rounded-xl overflow-hidden">
				<div className="col-span-2 text-xl p-4 italic capitalize">
					<header className="text-4xl space-x-2 whitespace-pre-wrap flex capitalize">
						<p>Total Value Locked All Chains:</p>
						<p>{tvl > 0 ? numeral(tvl).format("$0,") : null}</p>
					</header>
				</div>

				<div>{chainData && <PieChartComponent data={chainData} />}</div>
				<div className=" h-full text-white sm:w-full text-xl  italic capitalize">
          <TopChainsChart data={ethData} data2={tronData} data3={arbData}/>
				</div>
			</div>
		</main>
	);
};

export default StablecoinPage;
