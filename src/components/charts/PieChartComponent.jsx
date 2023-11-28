import React, { useState, useEffect } from "react";
import {
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Legend,
	Label,
	Tooltip,
} from "recharts";
import numeral from "numeral";

const PieChartComponent = ({ data }) => {
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(null);

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

	const handleMouseMove = (e) => {
		const container = document.getElementById("chart-container");
		const containerRect = container.getBoundingClientRect();
		const offsetX = e.clientX - containerRect.left;
		const offsetY = e.clientY - containerRect.top;
	};

	const handleMouseEnterSlice = (data, index) => {
		setActiveIndex(index);
	};

	const handleMouseLeaveSlice = () => {
		setActiveIndex(null);
	};

	const renderCustomTooltip = () => {
		if (data.length > 0) {
			if (activeIndex !== null) {
				const activeData = data[activeIndex];
				if (activeData) {
					const { chain, value } = activeData;
					return (
						<>
							<Label
								value={`${chain}: ${numeral(value).format("$0.00a")}`}
								position="center"
								style={{
									fill: `${colors[activeIndex % colors.length]}`,
									fontSize: `${isSmallScreen ? "16px" : "24px"}`,
								}}
							/>
						</>
					);
				}
			} else {
				const largestDataEntry = data.reduce((max, entry) =>
					entry.value > max.value ? entry : max
				);
				const { chain, value } = largestDataEntry;
				return (
					<>
						<Label
							value={`${chain}: ${numeral(value).format("$0.00a")}`}
							position="center"
							style={{
								fill: `${
									colors[data.indexOf(largestDataEntry) % colors.length]
								}`,
								fontSize: `${isSmallScreen ? "16px" : "24px"}`,
							}}
						/>
					</>
				);
			}
		}
		return null;
	};

	return (
		<div id="chart-container " className="p-4">
			<ResponsiveContainer
				className="m-auto h-max"
				height={isSmallScreen ? 400 : data.length > 20 ? 800 : 600}
			>
				<PieChart onMouseMove={handleMouseMove}>
					<Pie
						data={data}
						dataKey="value"
						nameKey="chain"
						cx="50%"
						cy="50%"
						outerRadius={isSmallScreen ? 100 : 200}
						innerRadius={isSmallScreen ? 80 : 150}
						fill="#8884d8"
						labelLine={0}
						onMouseEnter={handleMouseEnterSlice}
						onMouseLeave={handleMouseLeaveSlice}
						animationDuration={500}
					>
						{data.map((entry, index) => (
							<Cell key={index} fill={colors[index % colors.length]} />
						))}
						{renderCustomTooltip()}
					</Pie>
					<Legend
						verticalAlign="bottom"
						align="left"
						layout="horizontal"
						wrapperStyle={{
							marginRight: "80px",
              fontSize: isSmallScreen ? "small" : "large",
              paddingLeft: 10
						}}
						payload={data
							.sort((a, b) => b.value - a.value)
							.map((entry, index) => ({
								value: `${entry.chain} - ${numeral(entry.value).format(
									"$0.00a"
								)}`,
								type: "dot",
								color: colors[index % colors.length],
							}))}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default PieChartComponent;
