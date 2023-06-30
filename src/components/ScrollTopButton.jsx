import { useState, useEffect } from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";

function ScrollToTopButton() {
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		function handleScroll() {
			const scrollY = window.scrollY;
			setShowButton(scrollY > 0);
		}

		document.addEventListener("scroll", handleScroll);

		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, []);

	function handleClick() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	return (
		<button
			className={`flex w-full items-center justify-evenly backdrop-blur-2xl sm:hidden md:hidden bg-transparent border transition duration-100 border-gray-600 hover:bg-gray-600 text-gray-400 font-bold py-2 px-2 md:px-4 rounded-xl ${
				showButton ? "block" : "hidden"
			}`}
			onClick={handleClick}
		>
			<p className="sm:hidden md:hidden block">Scroll Up</p>
			<BsArrowUpSquareFill />
		</button>
	);
}

export default ScrollToTopButton;
