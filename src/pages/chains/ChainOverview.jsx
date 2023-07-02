import React, { useEffect, useState, Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import PricePanel from "../../components/PricePanel";
import SearchList from "../../components/SearchList";
import numeral from "numeral";
import TopChainsChart from "../../components/charts/TopChainsChart";
import PieChartComponent from "../../components/charts/PieChartComponent";
import Loader from "../../components/Loader";
import moment from "moment";

const ChartOverwiew = () => {
	const [chainData, setChainData] = useState(null);
	const [tvl, setTvl] = useState(0);
	const [ethData, setEthData] = useState([]);
	const [tronData, setTronData] = useState([]);
	const [arbData, setArbData] = useState([]);
	const [bscData, setBscData] = useState([]);
	const [polyData, setPolyData] = useState([]);
	const [opData, setOpData] = useState([]);
	const [avaxData, setAvaxData] = useState([]);
	const [mixinData, setMixinData] = useState([]);
	const [croData, setCroData] = useState([]);
	const [pulseData, setPulseData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const chainsRes = await axios.get("https://api.llama.fi/v2/chains");
				const chainsData = chainsRes.data;
				const updatedData = chainsData
					.sort((a, b) => b.value - a.value)
					.map((item) => ({
						chain: item.name,
						value: item.tvl,
					}));

				const allTvl = updatedData.reduce(
					(total, item) => total + item.value,
					0
				);
				setTvl(allTvl);

				const othersTvl = updatedData
					.slice(100)
					.reduce((total, item) => total + item.value, 0);

				const slicedData = updatedData
					.sort((a, b) => b.value - a.value)
					.map((item) => item)
					.slice(0, 10);

				const mergedData = [
					...slicedData,
					{ chain: "Others", value: othersTvl },
				];

				setChainData(mergedData);

				const [
					ethRes,
					tronRes,
					arbRes,
					polyRes,
					bscRes,
					avaxRes,
					opRes,
					mixinRes,
					croRes,
					pulseRes,
				] = await Promise.all([
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Ethereum"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Tron"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Arbitrum"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Bsc"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Polygon"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Optimism"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Avalanche"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Mixin"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Cronos"),
					axios.get("https://api.llama.fi/v2/historicalChainTvl/Pulse"),
				]);

				const ethData = ethRes.data.map((element) => ({
					date: element.date,
					value: element.tvl,
				}));
				setEthData(ethData);

				const tronData = tronRes.data.map((element) => ({
					date: element.date,
					value: element.tvl,
				}));
				setTronData(tronData);

				const bscData = bscRes.data.map((element) => ({
					date: element.date,
					value: element.tvl,
				}));
				setBscData(bscData);

				const arbData = arbRes.data.map((element) => ({
					date: element.date,
					value: element.tvl,
				}));
				setArbData(arbData);

				const polyData = polyRes.data.map((element) => ({
					date: element.date,
					value: element.tvl,
				}));
				setPolyData(polyData);

				const opData = opRes.data.map((element) => ({
					date: element.date,
					value: element.tvl,
				}));
				setOpData(opData);

				const avaxData = avaxRes.data.map((element) => ({
					date: element.date,
					value: element.tvl,
				}));
				setAvaxData(avaxData);

				const mixinData = mixinRes.data.map((element) => ({
					date: element.date,
					value: element.tvl,
				}));
				setMixinData(mixinData);

				const croData = croRes.data.map((element) => ({
					date: element.date,
					value: element.tvl,
				}));
				setCroData(croData);

				const pulseData = pulseRes.data.map((element) => ({
					date: element.date,
					value: element.tvl,
				}));
				setPulseData(pulseData);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	const alignDataByDate = (data, referenceData) => {
		return referenceData.map((item) => {
			const matchingItem = data.find((d) =>
				moment(d.date).isSame(moment(item.date), "day")
			);
			return matchingItem ? { ...matchingItem } : { ...item, value: null };
		});
	};

	const ethDataMapped = ethData.map((item) => ({
		...item,
		date: new Date(moment.unix(item.date).toDate()),
	}));

	const arbDataMapped = alignDataByDate(
		arbData.map((item) => ({
			...item,
			date: new Date(moment.unix(item.date).toDate()),
		})),
		ethDataMapped
	);

	const tronDataMapped = alignDataByDate(
		tronData.map((item) => ({
			...item,
			date: new Date(moment.unix(item.date).toDate()),
		})),
		ethDataMapped
	);

	const bscDataMapped = alignDataByDate(
		bscData.map((item) => ({
			...item,
			date: new Date(moment.unix(item.date).toDate()),
		})),
		ethDataMapped
	);

	const polyDataMapped = alignDataByDate(
		polyData.map((item) => ({
			...item,
			date: new Date(moment.unix(item.date).toDate()),
		})),
		ethDataMapped
	);

	const opDataMapped = alignDataByDate(
		opData.map((item) => ({
			...item,
			date: new Date(moment.unix(item.date).toDate()),
		})),
		ethDataMapped
	);

	const avaxDataMapped = alignDataByDate(
		avaxData.map((item) => ({
			...item,
			date: new Date(moment.unix(item.date).toDate()),
		})),
		ethDataMapped
	);

	const mixinDataMapped = alignDataByDate(
		mixinData.map((item) => ({
			...item,
			date: new Date(moment.unix(item.date).toDate()),
		})),
		ethDataMapped
	);

	const croDataMapped = alignDataByDate(
		croData.map((item) => ({
			...item,
			date: new Date(moment.unix(item.date).toDate()),
		})),
		ethDataMapped
	);

	const pulseDataMapped = alignDataByDate(
		pulseData.map((item) => ({
			...item,
			date: new Date(moment.unix(item.date).toDate()),
		})),
		ethDataMapped
	);

	const mergedData = ethDataMapped.map((item, index) => ({
		...item,
		value2: arbDataMapped[index].value || 1,
		value3: tronDataMapped[index].value || 1,
		value4: bscDataMapped[index].value || 1,
		value5: polyDataMapped[index].value || 1,
		value6: opDataMapped[index].value || 1,
		value7: avaxDataMapped[index].value || 1,
		value8: mixinDataMapped[index].value || 1,
		value9: croDataMapped[index].value || 1,
		value10: pulseDataMapped[index].value || 1,
	}));

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
						<p>Total Value Locked on All Chains:</p>
						<p>{tvl > 0 ? numeral(tvl).format("$0,") : null}</p>
					</header>
				</div>

				<div className="col-span-2">
					<Suspense fallback={<Loader />}>
						{mergedData && <TopChainsChart data={mergedData} />}
					</Suspense>
				</div>
				<div>
					<Suspense fallback={<Loader />}>
						{chainData && <PieChartComponent data={chainData} />}
					</Suspense>
				</div>
			</div>
		</main>
	);
};

export default ChartOverwiew;
