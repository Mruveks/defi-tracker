import React from "react";
import { Helmet } from "react-helmet";
import Ranking from "../components/rankings/Ranking";
import SearchList from "../components/SearchList";
import BackButton from "../components/BackButton";
const DEX = () => {
	return (
		<div className="grid grid-cols-1 mx-2 lg:mx-10 xl:mx-10 text-md">
			<Helmet>
				<title>DEX | DefiTracker</title>
				<meta
					name="description"
					content="Find the best decentralized exchanges"
				/>
			</Helmet>

			<BackButton />
			<SearchList />

			<div className="h-max my-4 text-white">
				<Ranking chain="Dexes" />
			</div>
		</div>
	);
};

export default DEX;
