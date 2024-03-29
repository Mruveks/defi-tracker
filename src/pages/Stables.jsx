import React from "react";
import { Helmet } from "react-helmet";
import StablesRanking from "../components/rankings/StablesRanking";
import StablesTVLchart from "../components/charts/StablesTVLchart";
import SearchList from "../components/SearchList";
import PricePanel from "../components/PricePanel";

const Stables = () => {
	return (
		<div className="grid grid-cols-1 mx-2 lg:mx-10 xl:mx-10 text-md">
			<Helmet>
				<title>Stablecoins | DefiTracker</title>
				<meta name="description" content="Find the best stablecoins" />
			</Helmet>

			<PricePanel />
			<SearchList />

			<div className="h-max my-4">
				<StablesTVLchart />
			</div>

			<StablesRanking />
		</div>
	);
};

export default Stables;
