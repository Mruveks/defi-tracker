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
} from "recharts";
import Loader from "../Loader";

const TopChainsChart = ({ data }) => {
	const [isChartReady, setChartReady] = useState(false);

	useEffect(() => {
		// Simulate loading delay
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
				<div className="w-60 backdrop-blur-md p-2 rounded-xl border border-gray-600 bg-transparent">
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
			<ResponsiveContainer height={500}>
				<LineChart data={data}>
					<Line
						type="monotone"
						dot={false}
						dataKey="value"
						stroke={colors[0]}
					/>
					<Line
						type="monotone"
						dot={false}
						dataKey="value2"
						stroke={colors[1]}
					/>
					<Line
						type="monotone"
						dot={false}
						dataKey="value3"
						stroke={colors[2]}
					/>
					<Line
						type="monotone"
						dot={false}
						dataKey="value4"
						stroke={colors[3]}
					/>
					<Line
						type="monotone"
						dot={false}
						dataKey="value5"
						stroke={colors[5]}
					/>
					<Line
						type="monotone"
						dot={false}
						dataKey="value6"
						stroke={colors[6]}
					/>
					<Line
						type="monotone"
						dot={false}
						dataKey="value7"
						stroke={colors[7]}
					/>
					<Line
						type="monotone"
						dot={false}
						dataKey="value8"
						stroke={colors[8]}
					/>
					<Line
						type="monotone"
						dot={false}
						dataKey="value9"
						stroke={colors[9]}
					/>
					<Line
						type="monotone"
						dot={false}
						dataKey="value10"
						stroke={colors[10]}
					/>

					<CartesianGrid strokeDasharray="3 3" opacity={0.1} />
					<XAxis
						dataKey="date"
						interval={365}
						tickFormatter={(value) => moment(value).format("MMM YYYY")}
						stroke="#8884d8"
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
						scale="log"
						domain={["auto", "auto"]}
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
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default TopChainsChart;
