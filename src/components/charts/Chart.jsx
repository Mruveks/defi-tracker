import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import numeral from "numeral";
import CustomTooltip from "./CustomTooltip";
import {
	ResponsiveContainer,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	AreaChart,
	Brush,
	Label,
	ReferenceLine,
	Area,
} from "recharts";

const Charts = ({ data }) => {
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const [isLogScale, setIsLogScale] = useState(false);
	const [hallmarks, setHallmarks] = useState(false);

	function findLargestElement(array) {
		if (array.length === 0) {
			return null;
		}

		let largestElement = array[0];

		for (let i = 1; i < array.length; i++) {
			if (array[i].value > largestElement.value) {
				largestElement = array[i];
			}
		}

		return largestElement.value;
	}
	const Element = findLargestElement(data);
	const value = Element;
	console.log(value);

	const ftxCollapse = moment.unix(1667865600).toDate();
	const ustDepeg = moment.unix(1651881600).toDate();

	const toggleScale = () => {
		setIsLogScale(!isLogScale);
		if (isLogScale === false) {
			setHallmarks(false);
		}
	};

	const dataWithDateObjects = data.map((item) => ({
		...item,
		date: new Date(item.date),
	}));

	const ftxCollapseData = {
		date: ftxCollapse,
		value: "date",
	};
	const ustDepegData = {
		date: ustDepeg,
		value: "date",
	};

	const updatedData = [
		...dataWithDateObjects,
		{
			...ftxCollapseData,
		},
		{
			...ustDepegData,
		},
	];

	const [activeIndex, setActiveIndex] = useState(
		dataWithDateObjects.length - 1
	);

	const toggleHallmarks = () => {
		setHallmarks(!hallmarks);
		setIsLogScale(false);
	};

	useEffect(() => {
		setActiveIndex(dataWithDateObjects.length - 1);
	}, []);

	const sortedData = [...updatedData].sort((a, b) => a.date - b.date);

	const ftxReferenceDataPoint = sortedData.find(
		(item) => item.date.getTime() === ftxCollapse.getTime()
	);
	const ftxReferenceDataIndex = sortedData.findIndex(
		(item) => item.date === ftxReferenceDataPoint.date
	);
	const ustReferenceDataPoint = sortedData.find(
		(item) => item.date.getTime() === ustDepeg.getTime()
	);
	const ustReferenceDataIndex = sortedData.findIndex(
		(item) => item.date === ustReferenceDataPoint.date
	);

	return (
		<div className="w-full p-4">
			<div className="flex text-lg sm:hidden space-x-2">
				<button
					onClick={toggleScale}
					className={`rounded-lg px-2 h-fit transition duration-300 ${
						isLogScale === false ? "bg-[#8884d8] " : "bg-none"
					}`}
				>
					Linear
				</button>
				<button
					onClick={toggleScale}
					className={`rounded-lg px-2 h-fit transition duration-300 ${
						isLogScale === true ? "bg-[#8884d8]" : "bg-none"
					}`}
				>
					Logarithmic
				</button>
				<button
					onClick={toggleHallmarks}
					className={`rounded-lg px-2 h-fit transition duration-300 ${
						hallmarks === true ? "bg-[#8884d8] " : "bg-none"
					}`}
				>
					Hallmarks
				</button>
			</div>

			<ResponsiveContainer width="100%" className="sm:hidden" height={500}>
				<AreaChart data={updatedData}>
					<defs>
						<linearGradient
							id="area-chart-gradient"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop offset="20%" stopColor="#8884d8" stopOpacity={0.2} />
							<stop offset="95%" stopColor="#8884d8" stopOpacity={0.01} />
						</linearGradient>
					</defs>
					<CartesianGrid
						vertical={true}
						strokeOpacity={0.1}
						horizontal={true}
					/>
					<XAxis
						dataKey="date"
						axisLine={false}
						tickLine={false}
						interval={isSmallScreen ? 365 : 182}
						tickFormatter={(value) => moment(value).format("MMM YYYY")}
						stroke="#8884d8"
						tickSize={2}
						tick={{
							fontSize: 14,
							textAnchor: "start",
						}}
					/>
					<YAxis
						axisLine={false}
						tickLine={false}
						fontFamily="font-mono"
						stroke="#8884d8"
						tickFormatter={(value) => numeral(value).format("$0.00a")}
						tickSize={2}
						tick={{
							color: "blue",
							fontSize: 14,
							textAnchor: "end",
						}}
						padding={isSmallScreen ? { top: 10 } : { top: 80, bottom: 0 }}
						scale={isLogScale ? "log" : "linear"}
						domain={isLogScale ? ["auto", "auto"] : ["auto", "auto"]}
					/>
					<Tooltip
						active={activeIndex !== -1}
						width="100%"
						activeIndex={activeIndex}
						content={<CustomTooltip />}
						margin={(isSmallScreen ? { top: 12 } : { top: 20 }, { bottom: 20 })}
						position={isSmallScreen ? { x: 0, y: -20 } : { x: 70, y: 4 }}
					/>

					<ReferenceLine
						segment={
							hallmarks === true
								? [
										{
											x: ftxReferenceDataIndex,
											y: 0,
										},
										{
											x: ftxReferenceDataIndex,
											y: value + value * 0.1,
										},
								  ]
								: null
						}
						stroke="#fff"
						strokeDasharray="3 3"
						ifOverflow="extendDomain"
					>
						<Label
							value="FTX crash"
							offset={10}
							position="top"
							style={{ fill: "#fff" }}
						/>
					</ReferenceLine>
					<ReferenceLine
						segment={
							hallmarks === true
								? [
										{
											x: ustReferenceDataIndex,
											y: 0,
										},
										{
											x: ustReferenceDataIndex,
											y: value * 1.05,
										},
								  ]
								: null
						}
						stroke="#fff"
						strokeDasharray="3 3"
						ifOverflow="clip"
					>
						<Label
							value="UST depeg"
							offset={10}
							position="top"
							style={{ fill: "#fff" }}
						/>
					</ReferenceLine>
					<Area
						type="monotone"
						dataKey="value"
						stroke="#8884d8"
						fillOpacity={1}
						fill="url(#area-chart-gradient)"
					/>
					<Brush
						margin={{ top: 20, bottom: 20 }}
						height={40}
						padding={{ bottom: 4, top: 4 }}
						tickFormatter={() => ""}
						stroke="rgb(75 85 99)"
						travellerWidth={10}
						fill="#222f3e"
					>
						<AreaChart margin={{ top: 20, bottom: 20 }}>
							<CartesianGrid strokeOpacity={0.05} />
							<YAxis hide={true} stroke="transparent" />
							<Area
								dataKey="value"
								margin={{ top: 20, bottom: 20 }}
								stroke="#8884d8"
								fill="transparent"
							/>
						</AreaChart>
					</Brush>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};
export default Charts;
