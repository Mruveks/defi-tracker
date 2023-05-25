import React from "react";

const Footer = () => {
	return (
		<footer className="bg-gray-900 h-8 flex-shrink-0 flex items-center justify-center mx-10 rounded-t-xl">
			<p className="text-center text-gray-400">
				&copy; {new Date().getFullYear()} DefiTracker
			</p>
		</footer>
	);
};

export default Footer;
