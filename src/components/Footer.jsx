import React from "react";

const Footer = () => {
	return (
		<footer className="bg-gray-900 flex justify-center fixed bottom-0 w-screen">
			<p className="text-center text-gray-400">
				&copy; {new Date().getFullYear()} DefiTracker
			</p>
		</footer>
	);
};

export default Footer;
