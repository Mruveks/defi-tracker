import React, { useEffect, useState } from "react";
import moment from "moment";
import numeral from "numeral";
import CustomTooltip from "./CustomTooltip";
import {
	ResponsiveContainer,
	LineChart,
	XAxis,
	YAxis,
	Line,
	CartesianGrid,
	Tooltip,
	Area,
	AreaChart,
} from "recharts";
import Loader from "../Loader";

const TopChainsChart = ({ data }) => {
	const [isChartReady, setChartReady] = useState(false);
	const [isLogScale, setIsLogScale] = useState(false);

	const toggleScale = () => {
		setIsLogScale(!isLogScale);
		if (isLogScale === false) {
			setHallmarks(false);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			setChartReady(true);
		}, 2000);
	}, []);

	const colors = [
		"#7eaedf",
		"#ff8c77",
		"#95ca98",
		"#e4b77d",
		"#e68e9d",
		"#8884d8",
		"#b486c7",
		"#ff0000",
		"#c7d48d",
		"#00aabb",
		"#ffcc00",
	];

	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			const data = payload[0].payload;
			return (
				<div className="w-60 p-2 rounded-xl border border-gray-600 bg-gray-800">
					<p className="label text-2xl">
						{moment(data.date).format("MMM DD, YYYY")}
					</p>
					<span className="flex justify-between text-[#7eaedf]">
						<p>Ethereum:</p>
						{numeral(data.value === 1 ? 0 : data.value).format("$0.00a")}
					</span>
					<span className="flex justify-between text-[#ff8c77]">
						<p>Tron:</p>
						{numeral(data.value3 === 1 ? 0 : data.value3).format("$0.00a")}
					</span>
					<span className="flex justify-between text-[#95ca98]">
						<p>Bsc:</p>
						{numeral(data.value4 === 1 ? 0 : data.value4).format("$0.00a")}
					</span>
					<span className="flex justify-between text-[#e4b77d]">
						<p>Arbitrum:</p>
						{numeral(data.value2 === 1 ? 0 : data.value2).format("$0.00a")}
					</span>
					<span className="flex justify-between text-[#8884d8]">
						<p>Polygon:</p>
						{numeral(data.value5 === 1 ? 0 : data.value5).format("$0.00a")}
					</span>
					<span className="flex justify-between text-[#b486c7]">
						<p>Optimism:</p>
						{numeral(data.value6 === 1 ? 0 : data.value6).format("$0.00a")}
					</span>
					<span className="flex justify-between text-[#ff0000]">
						<p>Avalanche:</p>
						{numeral(data.value7 === 1 ? 0 : data.value7).format("$0.00a")}
					</span>
					<span className="flex justify-between text-[#c7d48d]">
						<p>Mixin:</p>
						{numeral(data.value8 === 1 ? 0 : data.value8).format("$0.00a")}
					</span>
					<span className="flex justify-between text-[#00aabb]">
						<p>Cronos:</p>
						{numeral(data.value9 === 1 ? 0 : data.value9).format("$0.00a")}
					</span>
					<span className="flex justify-between text-[#ffcc00]">
						<p>Pulse:</p>
						{numeral(data.value10 === 1 ? 0 : data.value10).format("$0.00a")}
					</span>
				</div>
			);
		}
		return null;
	};

	if (!isChartReady) {
		return <Loader />;
	}

	return (
		<div className="w-full p-4">
			<div className="flex sm:grid-cols-2 sm:grid items-center sm:mx-auto mb-4 w-fit sm:space-y-2  text-lg space-x-2">
				<button
					onClick={toggleScale}
					className={`rounded-lg px-2 h-fit transition duration-300 border border-gray-600 ${
						isLogScale === false ? "bg-[#8884d8] " : "bg-none"
					}`}
				>
					Linear
				</button>
				<button
					onClick={toggleScale}
					className={`rounded-lg px-2 h-fit transition duration-300 border border-gray-600 ${
						isLogScale === true ? "bg-[#8884d8] " : "bg-none"
					}`}
				>
					Logarithmic
				</button>
			</div>

			<ResponsiveContainer height={500}>
				<AreaChart data={data}>
					<Area
						type="monotone"
						fillOpacity={1}
						dot={false}
						dataKey="value"
						fill={colors[0]}
					/>
					<Area
						type="monotone"
						fillOpacity={1}
						dot={false}
						dataKey="value2"
						fill={colors[1]}
					/>
					<Area
						type="monotone"
						fillOpacity={1}
						dot={false}
						dataKey="value3"
						fill={colors[2]}
					/>
					<Area
						type="monotone"
						fillOpacity={1}
						dot={false}
						dataKey="value4"
						fill={colors[3]}
					/>
					<Area
						type="monotone"
						fillOpacity={1}
						dot={false}
						dataKey="value5"
						fill={colors[5]}
					/>
					<Area
						type="monotone"
						fillOpacity={1}
						dot={false}
						dataKey="value6"
						fill={colors[6]}
					/>
					<Area
						type="monotone"
						fillOpacity={1}
						dot={false}
						dataKey="value7"
						fill={colors[7]}
					/>
					<Area
						type="monotone"
						fillOpacity={1}
						dot={false}
						dataKey="value8"
						fill={colors[8]}
					/>
					<Area
						type="monotone"
						fillOpacity={1}
						dot={false}
						dataKey="value9"
						fill={colors[9]}
					/>
					<Area
						type="monotone"
						fillOpacity={1}
						dot={false}
						dataKey="value10"
						fill={colors[10]}
					/>

					<CartesianGrid strokeDasharray="3 3" opacity={0.2} />
					<XAxis
						dataKey="date"
						interval={365}
						tickFormatter={(value) => moment(value).format("MMM YYYY")}
						fill="#8884d8"
						tickSize={2}
						tick={{
							fontSize: 14,
							textAnchor: "start",
						}}
					/>
					<YAxis
						fontFamily="font-mono"
						stroke="#8884d8"
						tickFormatter={(value) => numeral(value).format("$0.00a")}
						tickSize={2}
						tick={{
							color: "blue",
							fontSize: 14,
							textAnchor: "end",
						}}
						padding={{ top: 40 }}
						scale={isLogScale ? "log" : "linear"}
						domain={isLogScale ? [10000, "auto"] : ["auto", "auto"]}
					/>
					<Tooltip
						content={<CustomTooltip />}
						cursor={{
							strokeDasharray: "3 3",
							strokeWidth: 1,
							strokeOpacity: 0.8,
						}}
						position={{ x: 80, y: 120 }}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default TopChainsChart;
