import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import numeral from "numeral";
import { Link } from "react-router-dom";
import {
	eth,
	lido,
	aave,
	uniswap,
	pancakeswap,
	sushi,
	curve,
} from "../assets/AssetsIndex";

function PricePanel() {
	const [ethPrice, setEthPrice] = useState(0);
	const [lidoPrice, setLidoPrice] = useState(0);
	const [uniPrice, setUniPrice] = useState(0);
	const [aavePrice, setAavePrice] = useState(0);
	const [curvePrice, setCurvePrice] = useState(0);
	const [sushiPrice, setSushiPrice] = useState(0);
	const [pancakePrice, setPancakePrice] = useState(0);
	const navigate = useNavigate();

	function handleClick() {
		navigate(-1);
	}

	useEffect(() => {
		const fetchPrice = async () => {
			try {
				const response = await axios.get(
					"https://coins.llama.fi/prices/current/coingecko:ethereum,coingecko:lido-dao,coingecko:uniswap,coingecko:aave,coingecko:curve-dao-token,coingecko:sushi,coingecko:pancakeswap-token"
				);
				const data = response.data.coins;
				setEthPrice(data["coingecko:ethereum"].price);
				setUniPrice(data["coingecko:uniswap"].price);
				setLidoPrice(data["coingecko:lido-dao"].price);
				setAavePrice(data["coingecko:aave"].price);
				setSushiPrice(data["coingecko:sushi"].price);
				setCurvePrice(data["coingecko:curve-dao-token"].price);
				setPancakePrice(data["coingecko:pancakeswap-token"].price);
			} catch (error) {
				console.log(error);
			}
		};

		fetchPrice();
	}, []);

	return (
		<div className="flex sm:hidden md:hidden items-center space-x-8">
			<button
				className="flex w-fit items-center space-x-2 my-2 bg-gray-850 rounded-xl backdrop-blur-2xl border transition duration-100 border-gray-600  hover:bg-gray-600 text-gray-400 font-bold py-2 px-4 "
				onClick={handleClick}
			>
				<BsArrowLeft />
				<p>Go Back</p>
			</button>
			<Link to="/chain/ethereum" className="flex items-center hover:underline">
				<img src={eth} alt="" className="rounded-full h-5 w-5 mr-1" />
				ETH: {numeral(ethPrice).format("$0,0.00")}
			</Link>
			<Link to="/protocol/Uniswap%20V2" className="flex items-center hover:underline">
				<img src={uniswap} alt="" className="rounded-full h-5 w-5 mr-1" />
				UNI: {numeral(uniPrice).format("$0,0.00")}
			</Link>
			<Link to="/protocol/lido"className="flex items-center hover:underline">
				<img src={lido} alt="" className="rounded-full h-5 w-5 mr-1" />
				LDO: {numeral(lidoPrice).format("$0,0.00")}
			</Link>
			<Link to="/protocol/aave%20V2" className="flex items-center hover:underline">
				<img src={aave} alt="" className="rounded-full h-5 w-5 mr-1" />
				AAVE: {numeral(aavePrice).format("$0,0.00")}
			</Link>
			<Link to="/protocol/Curve%20DEX" className="flex items-center hover:underline">
				<img src={curve} alt="" className="rounded-full h-5 w-5 mr-1" />
				CRV: {numeral(curvePrice).format("$0,0.00")}
			</Link>
			<Link to="/protocol/SushiSwap" className="flex items-center hover:underline">
				<img src={sushi} alt="" className="rounded-full h-5 w-5 mr-1" />
				SUSHI: {numeral(sushiPrice).format("$0,0.00")}
			</Link>
			<Link to="/protocol/PancakeSwap%20AMM" className="flex items-center hover:underline">
				<img src={pancakeswap} alt="" className="rounded-full h-5 w-5 mr-1" />
				CAKE: {numeral(pancakePrice).format("$0,0.00")}
			</Link>
		</div>
	);
}

export default PricePanel;
