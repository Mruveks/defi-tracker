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

const PieChartComponent = ({ data, tvl }) => {
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

	const colors = [
		"#7eaedf",
		"#ff8c77",
		"#95ca98",
		"#e4b77d",
		"#e68e9d",
		"#8884d8",
		"#b486c7",
		"#a893cc",
		"#c7d48d",
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
		setTooltipPosition({ x: offsetX, y: offsetY });
	};

	const handleMouseEnterSlice = (data, index) => {
		setActiveIndex(index);
	};

	const handleMouseLeaveSlice = () => {
		setActiveIndex(null);
	};

	const renderCustomTooltip = () => {
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
								fontSize: `${isSmallScreen ? '16px' : '24px'}`,
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
							fill: `${colors[data.indexOf(largestDataEntry) % colors.length]}`,
              fontSize: `${isSmallScreen ? '16px' : '24px'}`,
						}}
					/>
				</>
			);
		}
		return null;
	};

	return (
		<div id="chart-container">
			<ResponsiveContainer
				className="m-auto h-max"
				height={isSmallScreen ? 700 : data.length > 20 ? 1000 : 600}
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
						wrapperStyle={{ marginRight: "80px" }}
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
