import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
	BsPercent,
	BsCoin,
	BsBank,
	BsCodeSlash,
	BsBarChart,
	BsJustify,
} from "react-icons/bs";
import {
	eth,
	bsc,
	avax,
	polygon,
	optimism,
	arbitrum,
} from "../assets/AssetsIndex.js";
import { GiRialtoBridge } from "react-icons/gi";
import { RiHandCoinLine } from "react-icons/ri";
import "../css/animations.css";

const Navbar = () => {
	const [activeNav, setActiveNav] = useState("/");

	const elementStyle =
		"flex items-center capitalize rounded-lg hover:bg-gray-700";

	const link = (chainId, img) => {
		return (
			<NavLink
				key={chainId}
				to={`/chain/${chainId}`}
				onClick={() => {
					setActiveNav(`/${chainId}`);
					openNav();
				}}
				className={`${
					activeNav === `/${chainId}` ? "bg-gray-700" : ""
				} ${elementStyle} `}
			>
				<img src={img} alt="" className="rounded-full mr-2" />
				{chainId}
			</NavLink>
		);
	};

	const [navHeight, setNavHeight] = useState("h-16");

	const [isRotated, setIsRotated] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsRotated(!isRotated);
		setIsOpen(!isOpen);
	};
	function openNav() {
		handleClick();
		if (navHeight === "h-16") {
			setNavHeight("h-fit");
		} else setNavHeight("h-16");
	}

	return (
		<div
			className={`sm:flex md:flex hidden sm:right-0 sm:left-0 md:left-0 md:right-0 top-0 fixed z-50 bg-gray-900 rounded-b-xl md:mx-10 ${navHeight} overflow-y-hidden `}
		>
			<div className="w-full p-4">
				<header className="flex justify-between items-center pb-4 text-3xl text-gray-400 ">
					<p>Dashboards</p>
					<BsJustify
						onClick={() => {
							openNav();
							handleClick();
						}}
						className={`box ${isRotated ? "rotate" : ""} ${
							isOpen ? "" : "rotate-back"
						} cursor-pointer transition duration-300`}
					/>
				</header>
				<ul className="grid gap-2 sm:grid-cols-2 grid-cols-3 pb-4 border-gray-600 border-b">
					<li>
						<NavLink
							to="/"
							onClick={() => {
								setActiveNav("/defi");
								openNav();
							}}
							className={`${
								activeNav === "/defi" ? "bg-gray-700" : ""
							} ${elementStyle}`}
						>
							<BsBarChart size={24} className="mr-2" />
							Defi
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/stablecoins"
							onClick={() => {
								setActiveNav("/stablecoins");
								openNav();
							}}
							className={`${
								activeNav === "/stablecoins" ? "bg-gray-700" : ""
							} ${elementStyle} `}
						>
							<BsCoin size={28} className="mr-2" />
							Stablecoins
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/dex"
							onClick={() => {
								setActiveNav("/dex");
								openNav();
							}}
							className={`${
								activeNav === "/dex" ? "bg-gray-700" : ""
							} ${elementStyle}`}
						>
							<BsCodeSlash size={24} className="mr-2" />
							Dex
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/cex"
							onClick={() => {
								setActiveNav("/cex");
								openNav();
							}}
							className={`${
								activeNav === "/cex" ? "bg-gray-700" : ""
							} ${elementStyle}`}
						>
							<BsBank size={24} className="mr-2" />
							Cex
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/yields"
							onClick={() => {
								setActiveNav("/yields");
								openNav();
							}}
							className={`${
								activeNav === "/yields" ? "bg-gray-700" : ""
							} ${elementStyle}`}
						>
							<BsPercent size={24} className="mr-2" />
							Yields
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/bridges"
							onClick={() => {
								setActiveNav("/bridges");
								openNav();
							}}
							className={`${
								activeNav === "/bridges" ? "bg-gray-700" : ""
							} ${elementStyle}`}
						>
							<GiRialtoBridge size={24} className="mr-2" />
							Bridges
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/lending"
							onClick={() => {
								setActiveNav("/lending");
								openNav();
							}}
							className={`${
								activeNav === "/lending" ? "bg-gray-700" : ""
							} ${elementStyle}`}
						>
							<RiHandCoinLine size={24} className="mr-2" />
							Lending
						</NavLink>
					</li>
				</ul>

				<header className="flex items-center py-4 text-3xl text-gray-400 ">
					Top Chains
				</header>
				<ul className="grid gap-2 sm:grid-cols-2  grid-cols-3">
					<li>{link("ethereum", eth)}</li>
					<li>{link("binance", bsc)}</li>
					<li>{link("avalanche", avax)}</li>
					<li>{link("polygon", polygon)}</li>
					<li>{link("arbitrum", arbitrum)}</li>
					<li>{link("optimism", optimism)}</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
