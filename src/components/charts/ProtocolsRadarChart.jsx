import React, { useState, useEffect } from "react";
import {
	CartesianGrid,
	BarChart,
	XAxis,
	YAxis,
	Cell,
	Bar,
	Label,
	ResponsiveContainer,
} from "recharts";

const ProtocolsRadarChart = ({ data }) => {
	const colors = [
		"#1f77b4",
		"#ff7f0e",
		"#2ca02c",
		"#d62728",
		"#9467bd",
		"#8c564b",
		"#e377c2",
		"#7f7f7f",
		"#bcbd22",
		"#17becf",
		"#aec7e8",
		"#ffbb78",
		"#98df8a",
		"#ff9896",
		"#c5b0d5",
		"#c49c94",
		"#f7b6d2",
		"#ffbb78",
		"#98df8a",
		"#ff9896",
		"#c5b0d5",
		"#c49c94",
		"#f7b6d2",
		"#ffbb78",
		"#98df8a",
		"#ff9896",
		"#c5b0d5",
		"#c49c94",
		"#f7b6d2",
		"#ffbb78",
	];
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 1100px)");

		const handleMediaQueryChange = (e) => {
			setIsSmallScreen(e.matches);
		};

		handleMediaQueryChange(mediaQuery);
		mediaQuery.addListener(handleMediaQueryChange);

		return () => {
			mediaQuery.removeListener(handleMediaQueryChange);
		};
	}, []);
	return (
		<div className="grid my-4 sm:hidden py-4 rounded-xl border bg-gray-900 border-gray-600">
			<header className="text-4xl p-4">Protocol Category Distribution</header>
			<ResponsiveContainer
				className="m-auto h-max"
				height={isSmallScreen ? 200 : 400}
			>
				<BarChart data={data} height={600}>
					<CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.4} />
					<XAxis
						dataKey="subject"
						axisLine={false}
						tickLine={true}
						stroke="lightgray"
						tick={false}
					>
						<Label
							value="Protocol categories"
							position="insideBottom"
							style={{ fill: "gray", textAnchor: "middle", fontSize: 14 }}
						/>
					</XAxis>
					<YAxis
						axisLine={false}
						tickLine={false}
						stroke="lightgray"
						tickSize={2}
						tick={{
							fontSize: 14,
							textAnchor: "end",
						}}
					>
						<Label
							value="Number of Protocols"
							position="insideLeft"
							angle={-90}
							style={{ fill: "gray", textAnchor: "middle", fontSize: 14 }}
							dx={20}
						/>
					</YAxis>
					<Bar
						dataKey="count"
						fill="url(#area-chart-gradient)"
						label={{
							position: "top",
							fill: "#fff",
							fontSize: isSmallScreen ? 10 : 15,
						}}
						barSize={80}
						opacity={0.8}
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={colors[index % colors.length]}
							/>
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default ProtocolsRadarChart;
