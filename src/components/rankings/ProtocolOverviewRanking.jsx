import React from "react";
import numeral from "numeral";
const ProtocolOverviewRanking = ({ data }) => {
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
		<div className="grid my-4 rounded-xl border border-gray-600">
			<div className="grid italic p-4 grid-cols-[10%_10%_10%_80%]">
				<header>Category</header>
				<header>Protocols</header>
				<header>TVL</header>
				<header>Description</header>
			</div>
			{data.map((item, index) => (
				<div
					key={index}
					className={`grid p-4 grid-cols-[10%_10%_10%_80%] ${
						index % 2 === 0 ? "bg-gray-850" : "bg-gray-800"
					}`}
				>
					<header
						style={{ color: colors[index % colors.length] }}
						className="capitalize font-normal brightness-125"
					>
						{item.subject}
					</header>
					<div>{item.count}</div>
					<div>{numeral(item.tvl).format("$0.0a")}</div>
					<div>{item.description}</div>
				</div>
			))}
		</div>
	);
};

export default ProtocolOverviewRanking;
