import React from "react";
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

const TopChainsChart = ({ data, data2, data3 }) => {

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

	const alignDataByDate = (data, referenceData) => {
		return referenceData.map((item) => {
			const matchingItem = data.find((d) =>
				moment(d.date).isSame(moment(item.date), "day")
			);
			return matchingItem ? { ...matchingItem } : { ...item, value: null };
		});
  };
  
	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			const data = payload[0].payload;
			return (
				<div className="custom-tooltip">
					<p className="label">{moment(data.date).format("MMM DD, YYYY")}</p>
          <p className="value">Ethereum: {numeral(data.value === 1 ? 0 : data.value).format("$0.00a")}</p>
          <p className="value">Tron: {numeral(data.value === 1 ? 0 : data.value2).format("$0.00a")}</p>
					<p className="value">Arbitrum: {numeral(data.value === 1 ? 0 : data.value3).format("$0.00a")}</p>

				</div>
			);
		}
		return null;
	};

	const dataWithDateObjects = data.map((item) => ({
		...item,
		date: new Date(moment.unix(item.date).toDate()),
	}));

	const dataWithDateObjects2 = alignDataByDate(
		data2.map((item) => ({
			...item,
			date: new Date(moment.unix(item.date).toDate()),
		})),
		dataWithDateObjects
	);

	const dataWithDateObjects3 = alignDataByDate(
		data3.map((item) => ({
			...item,
			date: new Date(moment.unix(item.date).toDate()),
		})),
		dataWithDateObjects
	);

	const mergedData = dataWithDateObjects.map((item, index) => ({
		...item,
		value2: dataWithDateObjects2[index].value || 1,
		value3: dataWithDateObjects3[index].value || 1,
	}));

	console.log(mergedData);
	return (
		<div className="w-full p-4">
			<ResponsiveContainer height={500}>
				<LineChart data={mergedData}>
					<Line type="monotone" dot={false} dataKey="value" stroke="#ff0000" />
					<Line type="monotone" dot={false} dataKey="value2" stroke="#fff" />
					<Line type="monotone" dot={false} dataKey="value3" stroke="#fff" />
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
						scale="log"
						domain={["auto", "auto"]}
					/>
          <Tooltip content={<CustomTooltip />} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default TopChainsChart;
