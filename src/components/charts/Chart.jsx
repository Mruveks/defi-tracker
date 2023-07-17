import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import numeral from "numeral";
import CustomTooltip from "./CustomTooltip";
import {
	ResponsiveContainer,
	ComposedChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	AreaChart,
	Brush,
	Label,
	ReferenceLine,
	ReferenceArea,
	Area,
} from "recharts";

const Charts = ({ data, options }) => {
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const [isLogScale, setIsLogScale] = useState(false);
	const [hallmarks, setHallmarks] = useState(false);
	const [hallmarksButton, setHallmarksButton] = useState(false);
	const [isVolume, setIsVolume] = useState(false);
	const [hasVolume, setHasVolume] = useState(false);

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

	const ftxCollapse = moment.unix(1667865600).toDate();
	const ustDepeg = moment.unix(1651881600).toDate();
	const threeAC = moment.unix(1654819200).toDate();

	const toggleScale = () => {
		setIsLogScale(!isLogScale);
		if (isLogScale === false) {
			setHallmarks(false);
		}
	};

	const dataWithDateObjects = data.map((item) => ({
		...item,
		date: new Date(moment.unix(item.date).toDate()),
	}));

	const updatedData = [
		...dataWithDateObjects,
		{ date: ftxCollapse },
		{ date: ustDepeg },
		{ date: threeAC },
	];

	const [activeIndex, setActiveIndex] = useState(
		dataWithDateObjects.length - 1
	);

	const toggleHallmarks = () => {
		setHallmarks(!hallmarks);
		setIsLogScale(false);
	};
	const toggleVolume = () => {
		setIsVolume(!isVolume);
	};

	useEffect(() => {
		data.map((element) => {
			if (element.volume) {
				setHasVolume(true);
			}
		});
	});

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

	const threeAcReferenceDataPoint = sortedData.find(
		(item) => item.date.getTime() === threeAC.getTime()
	);

	const threeAcReferenceDataIndex = sortedData.findIndex(
		(item) => item.date === threeAcReferenceDataPoint.date
	);
	const firstDate = moment(updatedData[0].date).format("X");
	let secondDate = 0;

	useEffect(() => {
		if (ustReferenceDataIndex > 0) {
			secondDate = moment(
				dataWithDateObjects[ustReferenceDataIndex].date
			).format("X");
		}

		if (firstDate < secondDate) {
			setHallmarksButton(true);
		} else setHallmarksButton(false);
	});

	return (
		<div className="w-full sm:hidden p-4 bg-gray-900">
			<div className="flex sm:grid-cols-2 sm:grid items-center sm:mx-auto mb-4 w-fit sm:space-y-2  text-lg space-x-2">
				<button
					onClick={toggleScale}
					className={`rounded-lg px-2 h-fit transition duration-300 border border-gray-600 ${
						isLogScale === false ? "bg-[#8884d8] " : "bg-none"
					}`}
				>
					Linear
				</button>
				{options === "bridge" ? null : (
					<button
						onClick={toggleScale}
						className={`rounded-lg px-2 h-fit transition duration-300 border border-gray-600 ${
							isLogScale === true ? "bg-[#8884d8] " : "bg-none"
						}`}
					>
						Logarithmic
					</button>
				)}
				{hallmarksButton === true ? (
					<button
						onClick={toggleHallmarks}
						className={`rounded-lg px-2 h-fit transition duration-300 border border-gray-600 ${
							hallmarks === true ? "bg-[#8884d8] " : "bg-none"
						}`}
					>
						Hallmarks
					</button>
				) : null}
				{hasVolume === true ? (
					<button
						onClick={toggleVolume}
						className={`rounded-lg px-2 h-fit transition duration-300 border border-gray-600 ${
							isVolume === true ? "bg-[#8884d8] " : "bg-none"
						}`}
					>
						Volume
					</button>
				) : null}
			</div>

			<ResponsiveContainer width="100%" height={500}>
				<ComposedChart
					data={
						hallmarks === true ? sortedData.slice(3) : updatedData.slice(0, -3)
					}
				>
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
						interval={isSmallScreen ? 365 : 365}
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
						fontFamily=""
						stroke="#8884d8"
						tickFormatter={(value) => numeral(value).format("$0.00a")}
						tickSize={2}
						tick={{
							color: "blue",
							fontSize: 14,
							textAnchor: "end",
						}}
						padding={
							isSmallScreen
								? { top: 10 }
								: { top: options ? 40 : 80, bottom: options ? 40 : 0 }
						}
						scale={isLogScale ? "log" : "linear"}
						domain={isLogScale ? ["auto", "auto"] : ["auto", "auto"]}
					/>
					<Tooltip
						active={activeIndex !== -1}
						width="100%"
						activeIndex={activeIndex}
						content={<CustomTooltip options={options ? "yes" : null} />}
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
											y: value - value * 0.1,
										},
								  ]
								: null
						}
						stroke="#fff"
						strokeDasharray="3 3"
						ifOverflow="hidden"
					>
						<Label
							value="FTX crash"
							offset={-10}
							position="insideTopLeft"
							style={{ fill: "#fff" }}
							angle="-45"
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
											y: value,
										},
								  ]
								: null
						}
						stroke="#fff"
						strokeDasharray="3 3"
						ifOverflow="hidden"
					>
						<Label
							value="UST depeg"
							offset={-10}
							position="insideTopLeft"
							style={{ fill: "#fff" }}
							angle="-45"
						/>
					</ReferenceLine>
					<ReferenceLine
						segment={
							hallmarks === true
								? [
										{
											x: threeAcReferenceDataIndex,
											y: 0,
										},
										{
											x: threeAcReferenceDataIndex,
											y: value - value * 0.1,
										},
								  ]
								: null
						}
						stroke="#fff"
						strokeDasharray="3 3"
						ifOverflow="hidden"
					>
						<Label
							value="3ac bankruptcy"
							offset={-10}
							position="insideTopLeft"
							style={{ fill: "#fff" }}
							angle="-45"
						/>
					</ReferenceLine>
					<Area
						dot={false}
						type="monotone"
						dataKey="value"
						stroke="#8884d8"
						fillOpacity={1}
						fill="url(#area-chart-gradient)"
						connectNulls={false}
					/>
					<ReferenceArea x1={110} x2={111} y1={11110} y2={11111}>
						<text x={22220} y={22220} fontSize={12} fill="#8884d8">
							Background Text
						</text>
					</ReferenceArea>
					{isVolume ? (
						<Bar
							yAxisId="volumeAxis"
							dataKey="volume"
							fill="#e68e9d"
							fillOpacity={1}
							animationEasing="ease-in-out"
						>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fillOpacity={0.5} />
							))}
						</Bar>
					) : null}
					<YAxis
						yAxisId="volumeAxis"
						orientation="right"
						axisLine={false}
						tickLine={false}
						fontFamily="font-mono"
						stroke="#e68e9d"
						tickFormatter={(value) => numeral(value).format("$0.00a")}
						tickSize={2}
						padding={isSmallScreen ? { top: 90 } : { top: 200, bottom: 0 }}
						scale={isLogScale ? "log" : "linear"}
						domain={isLogScale ? ["auto", "auto"] : ["auto", "auto"]}
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
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
};
export default Charts;
