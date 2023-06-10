import React, { useState, useEffect } from "react";
import {
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Legend,
	Line,
} from "recharts";
import numeral from "numeral";

const Charts = ({ data, tvl }) => {
	const [activeIndex, setActiveIndex] = useState(-1);
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const formatValue = (value) => numeral(value).format("$0.00a");

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

	const handleMouseEnter = (data, index) => {
		setActiveIndex(index);
	};

	const handleMouseLeave = () => {
		setActiveIndex(-1);
	};

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
		<ResponsiveContainer className="m-auto pointer-events-none" height={isSmallScreen ? 300 : 600}>
			<PieChart>
				<Pie
					data={data}
					dataKey="value"
					nameKey="chain"
					cx="50%"
					cy="50%"
					outerRadius={isSmallScreen ? 100 : 200}
					fill="#8884d8"
					labelLine={0}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					animationDuration={500}
				>
					{data.map((entry, index) => (
						<Cell key={index} fill={colors[index % colors.length]} />
					))}
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
							)} - ${((entry.value / tvl) * 100).toFixed(2)}%`,
							type: "dot",
							color: colors[index % colors.length],
						}))}
				/>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default Charts;
