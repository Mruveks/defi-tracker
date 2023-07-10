import React, { useEffect, useState, Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import PricePanel from "../../components/PricePanel";
import SearchList from "../../components/SearchList";
import numeral from "numeral";
import TopChainsChart from "../../components/charts/TopChainsChart";
import PieChartComponent from "../../components/charts/PieChartComponent";
import Loader from "../../components/Loader";
import ChainRanking from "../../components/rankings/ChainRanking";
import DataFetcher from "../../utilities/ChainsDataFetcher";

const ChartOverwiew = () => {
	const [tvl, setTvl] = useState(0);
	const [tvlData, data, mergedData] = DataFetcher();

	useEffect(() => {
		if (tvlData) {
			setTvl(tvlData);
		}
	}, [tvlData]);
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

				<div>
					<Suspense fallback={<Loader />}>
						{data && <PieChartComponent data={data} />}
					</Suspense>
				</div>
				<div className="col-span-1">
					<Suspense fallback={<Loader />}>
						{mergedData && <TopChainsChart data={mergedData} />}
					</Suspense>
				</div>
			</div>

			<div className="h-max my-4 text-white">
				<ChainRanking />
			</div>
		</main>
	);
};

export default ChartOverwiew;
