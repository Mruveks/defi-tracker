import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";

const AddressFormatter = ({ address }) => {
	let firstFour;
	let lastFour;

	const [chain, code] = address.split(":");
	const [copied, setCopied] = useState(false);

	if (address && address.includes(":")) {
		const [blockchain, addr] = address.split(":");
		firstFour = addr.slice(0, 8);
		lastFour = addr.slice(-8);
	} else {
		firstFour = address.slice(0, 8);
		lastFour = address.slice(-8);
	}

	const handleCopy = () => {
		navigator.clipboard.writeText(address);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 500);
	};

	return (
		<>
			<span className="font-medium italic lg:block xl:block hidden font-mono">
				{code ? (
					code
				) : (
					<div className="flex space-x-2 items-center">
						<p>{address}</p>
						<FaRegCopy
							className={`text-gray-400 ${copied ? "" : "cursor-pointer"}`}
							onClick={handleCopy}
						/>
						{copied && <span className="ml-1 text-gray-400">Copied!</span>}
					</div>
				)}
			</span>
			<span className="italic flex space-x-2 xl:hidden lg:hidden visible font-mono items-center">
				<p>
					{firstFour}...{lastFour}
				</p>
				<FaRegCopy
					className={`text-gray-400 ${copied ? "" : "cursor-pointer"}`}
					onClick={handleCopy}
				/>
				{copied && <span className="ml-1 text-gray-400">Copied!</span>}
			</span>
		</>
	);
};

export default AddressFormatter;
