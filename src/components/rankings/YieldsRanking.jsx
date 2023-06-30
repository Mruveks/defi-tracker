import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../Loader";
import numeral from "numeral";
import { Link } from "react-router-dom";
const YieldsRanking = () => {
	const [Yields, setYields] = useState([]);

	useEffect(() => {
		axios
			.get("https://yields.llama.fi/pools")
			.then((res) => {
				setYields(res.data.data);
				console.log(Yields);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<div className="h-max my-4  text-md border rounded-xl bg-gray-850 border-gray-600">
				<div className="grid grid-cols-7 sm:grid-cols-3 font-semibold p-2 text-lg sm:text-sm text-right capitalize italic">
					<header className="text-left pl-2">Pool</header>
					<header className="text-left pl-4">Project</header>
					<header className="sm:hidden block">Chain</header>
					<header>APY</header>
					<header className="sm:hidden block">Base APY</header>
					<header className="sm:hidden block">Reward APY</header>
					<header className="sm:hidden block">TVL</header>
				</div>

				{Yields.length ? (
					Yields.filter(
						(item) =>
							item.apy != null && item.apy != "0" && item.tvlUsd >= 1000000
					).map((pool, index) => (
						<div
							key={index}
							className={` ${
								index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"
							} grid grid-cols-7 sm:grid-cols-3 items-center p-2 text-right`}
						>
							<div className="flex space-x-4 sm:space-x-0 sm:p-0 text-left my-2 p-2 capitalize items-center">
								<p>{pool.symbol.toLowerCase()}</p>
							</div>
							<Link
								to={`/protocol/${pool.project}`}
								className="flex xl:whitespace-nowrap items-center space-x-2 px-2 text-left text-blue-400 hover:underline transition duration-300"
							>
								<div className="md:w-40 px-2 capitalize my-auto">
									{pool.project}
								</div>
							</Link>
							<Link
								to={
									pool.chain === "BSC"
										? `/chain/Binance`
										: `/chain/${pool.chain}`
								}
								onClick={
									pool.chain === "BSC"
										? () => setActiveNav(`/Binance`)
										: () => setActiveNav(`/${pool.chain}`)
								}
								className="flex sm:hidden w-fit justify-self-end justify-end items-center rounded-xl"
							>
								<div className="w-fit md:w-40 px-2 my-auto capitalize text-blue-400 hover:underline transition duration-100 rounded-xl">
									{pool.chain}
								</div>
							</Link>

							{pool.apy ? (
								<div className="font-mono">
									{parseFloat(pool.apy).toFixed(2) + "%"}
								</div>
							) : (
								<div></div>
							)}

							{pool.apyBase ? (
								<div className="sm:hidden block font-mono">
									{parseFloat(pool.apyBase).toFixed(2) + "%"}
								</div>
							) : (
								<div className="sm:hidden block"></div>
							)}

							{pool.apyReward ? (
								<div className="sm:hidden block font-mono">
									{parseFloat(pool.apyReward).toFixed(2) + "%"}
								</div>
							) : (
								<div className="sm:hidden block"></div>
							)}

							<div className="font-mono sm:hidden">
								{numeral(pool.tvlUsd).format("$0.00a")}
							</div>
						</div>
					))
				) : (
					<Loader />
				)}
			</div>
		</>
	);
};

export default YieldsRanking;
