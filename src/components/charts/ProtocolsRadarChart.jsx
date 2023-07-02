import React from "react";
import {
	CartesianGrid,
	BarChart,
	XAxis,
	YAxis,
	Cell,
	Legend,
	Bar,
	Label,
	LabelList,
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

	return (
    <div className="grid my-4 py-4 rounded-xl border bg-gray-900 border-gray-600">
      <header className="text-4xl p-4">Protocol Category Distribution</header>
			<BarChart data={data} width={1600} height={600}>
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
					label={{ position: "top", fill: "#fff" }}
					barSize={100}
					opacity={0.8}
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
					))}
				</Bar>
				<Legend
					verticalAlign="bottom"
					align="center"
					layout="horizontal"
					wrapperStyle={{
						paddingTop: 20,
						paddingLeft: 10,
					}}
					payload={data
						.sort((a, b) => b.value - a.value)
						.map((entry, index) => ({
							value: `${
								entry.subject.charAt(0).toUpperCase() + entry.subject.slice(1)
							} - ${entry.count}`,
							type: "dot",
							color: colors[index % colors.length],
						}))}
				/>
			</BarChart>
		</div>
	);
};

export default ProtocolsRadarChart;
