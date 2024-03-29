import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import numeral from "numeral";
import { Link } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";

const ChainRanking = () => {
	const [protocols, setProtocols] = useState([]);

	useEffect(() => {
		axios
			.get("https://api.llama.fi/v2/chains")
			.then((res) => {
				setProtocols(res.data);
				console.log(protocols);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<div className="h-max my-4 text-md border-gray-600 border py-2 rounded-xl bg-gray-850">
				<div className="grid grid-cols-2 text-lg sm:text-sm font-semibold p-2 border-b-gray-600 text-left italic capitalize">
					<header>Name</header>
					<header>TVL</header>
				</div>

				{protocols.length ? (
					protocols
						.sort((a, b) => b.tvl - a.tvl)
						.filter((protocol) => protocol.tvl >= 100000)
						.map((protocol, index) => (
							<div
								key={index}
								className={` ${
									index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"
								} grid grid-cols-2 items-center px-2 py-1 text-left`}
							>
								<Link
									to={`/chain/${protocol.name}`}
									className="flex items-center sm:space-x-0 space-x-4 w-full pl-2 py-2 text-left hover:underline decoration-blue-400 rounded-xl"
								>
									<div className="w-full flex items-center text-blue-400 space-x-2">
										<p> {protocol.name}</p>
										{protocol.tokenSymbol ? (
											<span>({protocol.tokenSymbol})</span>
										) : null}
									</div>
								</Link>
								<div>{numeral(protocol.tvl).format("$0.00a")}</div>
							</div>
						))
				) : (
					<Loader />
				)}
			</div>
		</>
	);
};

export default ChainRanking;
