import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../Loader";
import numeral from "numeral";
import { Link } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";
const TVLranking = () => {
	const [protocols, setProtocols] = useState([]);

	useEffect(() => {
		axios
			.get("https://api.llama.fi/protocols")
			.then((res) => {
				setProtocols(res.data);
				const datas = protocols
					.filter((item) => item.category === "Chain")
					.map((item) => item);
				console.log(datas);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<div className="h-max my-4 text-md border-gray-600 border py-2 rounded-xl bg-gray-850">
				<div className="grid grid-cols-8 lg:grid-cols-6 sm:grid-cols-2 text-lg sm:text-sm font-semibold p-2 border-b-gray-600 text-right italic capitalize">
					<header className="text-left">Name</header>
					<header className="sm:hidden md:hidden lg:hidden block">
						Category
					</header>
					<header className="sm:hidden md:hidden lg:hidden block">Chain</header>
					<header className="sm:hidden block">1h Change</header>
					<header className="sm:hidden block">1d Change</header>
					<header className="sm:hidden block">7d Change</header>
					<header>TVL</header>
					<header className="sm:hidden flex w-full justify-end items-center space-x-1">
						<div className="group flex items-center space-x-2 relative">
							<AiOutlineInfoCircle className="text-gray-400 group-hover:text-blue-500 cursor-pointer" />
							<p>Mcap/TVL</p>
							<div className="hidden group-hover:block whitespace-nowrap font-normal absolute -top-12 text-xs transform -translate-x-1/2 bg-gray-800 border border-gray-600 text-white p-2 rounded-xl">
                Greater than 1 = overvalued <br/>
                Less than 1 = undervalued
							</div>
						</div>
					</header>
				</div>

				{protocols.length ? (
					protocols
						.filter(
							(item) =>
								item.tvl != null &&
								item.tvl >= 1000000 &&
								item.category !== "CEX" &&
								item.category !== "Chain"
						)
						.map((protocol, index) => (
							<div
								key={index}
								className={` ${
									index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"
								} grid grid-cols-8 md:grid-cols-6 lg:grid-cols-6 sm:grid-cols-2 items-center py-1 px-2 text-right`}
							>
								<Link
									to={`/protocol/${protocol.name}`}
									className="flex items-center sm:space-x-0 space-x-4 w-full pl-2 py-2 text-left hover:underline decoration-blue-400 transition duration-300 rounded-xl"
								>
									<div className="w-full flex items-center text-blue-400 space-x-2">
										<img
											src={protocol.logo}
											alt="logo"
											className="h-8 w-8 rounded-full "
										/>
										<p> {protocol.name}</p>
									</div>
								</Link>

								<div className="sm:hidden md:hidden lg:hidden block">
									{protocol.category}
								</div>
								<div className="sm:hidden md:hidden lg:hidden block">
									{protocol.chain}
								</div>

								{protocol.change_1h > 0 ? (
									<div className="text-green-500 sm:hidden block">
										+{parseFloat(protocol.change_1h).toFixed(2)}%
									</div>
								) : (
									<div className="text-red-500 sm:hidden block">
										{parseFloat(protocol.change_1h).toFixed(2)}%
									</div>
								)}

								{protocol.change_1d > 0 ? (
									<div className="text-green-500 sm:hidden block">
										+{parseFloat(protocol.change_1d).toFixed(2)}%
									</div>
								) : (
									<div className="text-red-500 sm:hidden block">
										{parseFloat(protocol.change_1d).toFixed(2)}%
									</div>
								)}

								{protocol.change_7d > 0 ? (
									<div className="text-green-500 sm:hidden block">
										+{parseFloat(protocol.change_7d).toFixed(2)}%
									</div>
								) : (
									<div className="text-red-500 sm:hidden block">
										{parseFloat(protocol.change_7d).toFixed(2)}%
									</div>
								)}

								{numeral(protocol.tvl).format("$0.00a")}

								{protocol.mcap ? (
									<div className="sm:hidden block">
										{(protocol.mcap / protocol.tvl).toFixed(2)}
									</div>
								) : (
									<div></div>
								)}
							</div>
						))
				) : (
					<Loader />
				)}
			</div>
		</>
	);
};

export default TVLranking;
