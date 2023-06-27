import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import numeral from "numeral";
function BackButton() {
	const [ethPrice, setEthPrice] = useState(0);
	const [lidoPrice, setLidoPrice] = useState(0);
	const [uniPrice, setUniPrice] = useState(0);
	const [aavePrice, setAavePrice] = useState(0);

	const navigate = useNavigate();

	function handleClick() {
		navigate(-1);
	}

	useEffect(() => {
		const fetchPrice = async () => {
			try {
				const response = await axios.get(
					"https://coins.llama.fi/prices/current/coingecko:ethereum,coingecko:lido-dao,coingecko:uniswap,coingecko:aave,coingecko:curve-dao"
				);
				const data = response.data.coins;
				setEthPrice(data["coingecko:ethereum"].price);
				setUniPrice(data["coingecko:uniswap"].price);
				setLidoPrice(data["coingecko:lido-dao"].price);
				setAavePrice(data["coingecko:aave"].price);
			} catch (error) {
				console.log(error);
			}
		};

		fetchPrice();
	}, []);

	return (
		<div className="flex sm:hidden md:hidden items-center space-x-8">
			<button
				className="flex w-fit items-center space-x-2 my-2 bg-gray-700 rounded-xl backdrop-blur-2xl sm:bg-gray-900 md:bg-gray-900 bg-transparent border transition duration-100 border-gray-600  hover:bg-gray-600 text-gray-400 font-bold py-2 px-4 "
				onClick={handleClick}
			>
				<BsArrowLeft />
				<p>Go Back</p>
			</button>
			<p>Ethereum: {numeral(ethPrice).format("$0,0.00")}</p>
			<p>Uniswap: {numeral(uniPrice).format("$0,0.00")}</p>
			<p>Lido: {numeral(lidoPrice).format("$0,0.00")}</p>
			<p>Aave: {numeral(aavePrice).format("$0,0.00")}</p>
		</div>
	);
}

export default BackButton;
