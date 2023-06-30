import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../css/animations.css";
import {
	BsPercent,
	BsCoin,
	BsBank,
	BsCodeSlash,
	BsBarChart,
} from "react-icons/bs";
import { GiRialtoBridge } from "react-icons/gi";
import { RiHandCoinLine } from "react-icons/ri";
import { TiArrowDown, TiArrowUp } from "react-icons/ti";
import ScrollToTopButton from "./ScrollTopButton";
import {
	eth,
	bsc,
	avax,
	polygon,
	optimism,
	solana,
	tron,
	arbitrum,
} from "../assets/AssetsIndex.js";

const Navbar = () => {
	const [activeNav, setActiveNav] = useState("/");

	const elementStyle =
		"flex px-1 py-1 group w-full items-center capitalize rounded-lg hover:bg-gray-600 rounded-xl transition duration-100 group";

	const link = (chainId, img) => {
		let chainName;

		if (chainId === "BSC") {
			chainName = "Binance";
		} else {
			chainName = chainId;
		}

		return (
			<NavLink
				key={chainName}
				to={`/chain/${chainName}`}
				onClick={() => setActiveNav(`/${chainName}`)}
				className={`${
					activeNav === `/${chainName}` ? "bg-gray-700" : ""
				} ${elementStyle} `}
			>
				<img src={img} alt="" className="rounded-full h-5 w-5 mr-2 wiggle" />
				{chainId}
			</NavLink>
		);
	};

	useEffect(() => {
		const handleURLChange = () => {
			if (
				currentURL.includes(
					"/defi" ||
						"/stablecoins" ||
						"/dex" ||
						"/cex" ||
						"/yield" ||
						"/bridges" ||
						"/lending"
				)
			) {
				console.log("does include");
			} else {
				setActiveNav("/");
			}
		};

		return;
	}, [window.location.pathname]);
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className="sm:hidden md:hidden block h-full w-52 border-r bg-gray-900 border-gray-600 fixed left-0 top-0 ">
			<aside>
				<div className="px-4 py-4 h-full overflow-auto">
					<ul className="space-y-2 text-base">
						<li>
							<header className="flex items-center text-xl mb-4 text-gray-400 ">
								<NavLink to="/">DefiTracker.eu</NavLink>
							</header>
						</li>
						<li className="group">
							<div
								onClick={() => toggleExpand()}
								className={`flex justify-between cursor-pointer ${elementStyle}`}
							>
								<p className="flex">
									<BsBarChart size={20} className="mr-2 wiggle" />
									Defi
								</p>
								{isExpanded ? (
									<TiArrowUp size={20} />
								) : (
									<TiArrowDown size={20} />
								)}
							</div>
							{isExpanded && (
								<div className="h-fit space-y-2 pt-2 w-full">
									<NavLink
										to="/"
										onClick={() => setActiveNav("/")}
										className={`pl-9 ${
											activeNav === "/" ? "bg-gray-700" : ""
										} ${elementStyle}`}
									>
										Overview
									</NavLink>
									<NavLink
										to="/chains"
										onClick={() => setActiveNav("/chains")}
										className={`pl-9 ${
											activeNav === "/chains" ? "bg-gray-700" : ""
										} ${elementStyle}`}
									>
										Chains
									</NavLink>
								</div>
							)}
						</li>
						<li className="group">
							<NavLink
								to="/stablecoins"
								onClick={() => setActiveNav("/stablecoins")}
								className={`${
									activeNav === "/stablecoins" ? "bg-gray-700" : ""
								} ${elementStyle} `}
							>
								<BsCoin size={20} className="mr-2 wiggle" />
								Stablecoins
							</NavLink>
						</li>
						<li className="group">
							<NavLink
								to="/dex"
								onClick={() => setActiveNav("/dex")}
								className={`${
									activeNav === "/dex" ? "bg-gray-700" : ""
								} ${elementStyle}`}
							>
								<BsCodeSlash size={20} className="mr-2 wiggle" />
								Dex
							</NavLink>
						</li>
						<li className="group">
							<NavLink
								to="/cex"
								onClick={() => setActiveNav("/cex")}
								className={`${
									activeNav === "/cex" ? "bg-gray-700" : ""
								} ${elementStyle}`}
							>
								<BsBank size={20} className="mr-2 wiggle" />
								Cex
							</NavLink>
						</li>
						<li className="group">
							<NavLink
								to="/yields"
								onClick={() => setActiveNav("/yields")}
								className={`${
									activeNav === "/yields" ? "bg-gray-700" : ""
								} ${elementStyle}`}
							>
								<BsPercent size={20} className="mr-2 wiggle" />
								Yields
							</NavLink>
						</li>
						<li className="group">
							<NavLink
								to="/bridges"
								onClick={() => setActiveNav("/bridges")}
								className={`${
									activeNav === "/bridges" ? "bg-gray-700" : ""
								} ${elementStyle}`}
							>
								<GiRialtoBridge size={20} className="mr-2 wiggle" />
								Bridges
							</NavLink>
						</li>
						<li className="group">
							<NavLink
								to="/lending"
								onClick={() => setActiveNav("/lending")}
								className={`${
									activeNav === "/lending" ? "bg-gray-700" : ""
								} ${elementStyle}`}
							>
								<RiHandCoinLine size={20} className="mr-2 wiggle" />
								Lending
							</NavLink>
						</li>
					</ul>

					<div className="border-b-2 border-gray-600 my-2"></div>

					<ul className="space-y-2 text-base ">
						<li>
							<header className="flex items-center text-xl mb-4 text-gray-400">
								Top Chains
							</header>
						</li>
						<li>{link("ethereum", eth)}</li>
						<li>{link("BSC", bsc)}</li>
						<li>{link("avalanche", avax)}</li>
						<li>{link("polygon", polygon)}</li>
						<li>{link("arbitrum", arbitrum)}</li>
						<li>{link("optimism", optimism)}</li>
						<li>{link("solana", solana)}</li>
						<li>{link("tron", tron)}</li>
					</ul>
				</div>
				<div className="flex mt-20 px-4">
					<ScrollToTopButton />
				</div>
			</aside>
		</div>
	);
};

export default Navbar;
