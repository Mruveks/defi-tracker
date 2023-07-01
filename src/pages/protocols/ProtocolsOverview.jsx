import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import PricePanel from "../../components/PricePanel";
import SearchList from "../../components/SearchList";

const ProtocolsOverview = () => {
	useEffect(() => {
		axios
			.get("https://api.llama.fi/protocols")
			.then((res) => {
				const data = res.data;
				const categories = data.reduce(
					(accumulator, item) => {
						if (item.category === "CEX") {
							accumulator.cex += 1;
						} else if (item.category === "Lending") {
							accumulator.lending += 1;
						} else if (item.category === "Yield") {
							accumulator.yield += 1;
						} else if (item.category === "Yield Aggregator") {
							accumulator.yield_aggregator += 1;
						} else if (item.category === "Dexes") {
							accumulator.dex += 1;
						} else if (item.category === "CDP") {
							accumulator.cdp += 1;
						} else if (item.category === "Insurance") {
							accumulator.insurance += 1;
						} else if (item.category === "Launchpad") {
							accumulator.liq_manager += 1;
						} else if (item.category === "Liquidity manager") {
							accumulator.launchpad += 1;
						} else if (item.category === "Payments") {
							accumulator.payments += 1;
						} else if (item.category === "Liquid Staking") {
							accumulator.liq_staking += 1;
						} else if (item.category === "Synthetics") {
							accumulator.synthetics += 1;
						} else if (item.category === "RWA") {
							accumulator.rwa += 1;
						} else if (item.category === "Leveraged Farming") {
							accumulator.lev_farming += 1;
						} else if (item.category === "Services") {
							accumulator.services += 1;
						} else if (item.category === "NFT Lending") {
							accumulator.nft_lending += 1;
						} else if (item.category === "Options") {
							accumulator.options += 1;
						}
						return accumulator;
					},
					{
						cex: 0,
						lending: 0,
						nft_lending: 0,
						options: 0,
						yield: 0,
						dex: 0,
						cdp: 0,
						yield_aggregator: 0,
						insurance: 0,
						launchpad: 0,
						liq_manager: 0,
						liq_staking: 0,
						payments: 0,
						rwa: 0,
						synthetics: 0,
						lev_farming: 0,
						services: 0,
					}
				);

				console.log(categories);
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

			<div></div>
		</main>
	);
};

export default ProtocolsOverview;
