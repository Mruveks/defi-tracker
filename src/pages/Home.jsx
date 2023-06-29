import React from "react";
import { Helmet } from "react-helmet";

import TVLranking from "../components/rankings/TVLranking";
import TVLchart from "../components/charts/TVLchart";
import SearchList from "../components/SearchList";
import BackButton from "../components/BackButton";
const Home = () => {
	return (
		<div className="grid grid-cols-1 mx-2 lg:mx-10 xl:mx-10 text-md">
			<Helmet>
				<title>DefiTracker</title>
				<meta
					name="description"
					content="Discover the best decentralized finance (DeFi) protocols"
				/>
			</Helmet>

			<BackButton />
			<SearchList />

			<div className="h-max my-4 text-white">
				<TVLchart />
			</div>

			<TVLranking />
		</div>
	);
};

export default Home;
