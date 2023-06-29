import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BannerData = () => {
	const [protocols, setProtocols] = useState([]);

	useEffect(() => {
		const fetchProtocols = async () => {
			try {
				const response = await axios.get("https://api.llama.fi/protocols");
				const protocols = response.data;
				const returnData = protocols
					.sort((a, b) => b.change_1d - a.change_1d)
					.filter((protocol) => protocol.tvl >= 1000000)
					.slice(0, 10);
				setProtocols(returnData);
				console.log(returnData);
			} catch (error) {
				console.log(error);
			}
		};

		fetchProtocols();
	}, []);

	return (
		<div className="flex space-x-4 ">
			{protocols.map((protocol, index) => (
				<li key={protocol.id} className="flex space-x-1">
					<p
						className={`text-gray-500 ${
							index === 0
								? " text-amber-300"
								: index === 1
								? "text-slate-400"
								: index === 2
								? "text-amber-600"
								: null
						}`}
					>
						#{index + 1}
					</p>
					<Link
						to={`/protocol/${protocol.name}`}
						className="italic hover:underline "
					>
						{protocol.name}:
					</Link>

					<p className="text-green-400"> {protocol.change_1d.toFixed(2)}%</p>
				</li>
			))}
		</div>
	);
};

export default BannerData;
