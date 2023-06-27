import React, { useEffect, useRef } from "react";
import BannerData from "../utilities/BannerData";
const RollingBanner = () => {
	const contentRef = useRef(null);
	const animationRef = useRef(null);

	const animate = () => {
		const contentWidth = contentRef.current.offsetWidth;
		const parentWidth = contentRef.current.parentNode.offsetWidth;

		let position = parentWidth;

		const frame = () => {
			position -= 1;
			contentRef.current.style.transform = `translateX(${position}px)`;

			if (position <= -contentWidth) {
				position = parentWidth;
				contentRef.current.style.transform = `translateX(${position}px)`;
			}

			animationRef.current = requestAnimationFrame(frame);
		};

		frame();
	};

	useEffect(() => {
		animate();

		return () => {
			cancelAnimationFrame(animationRef.current);
		};
	}, []);

	return (
		<div className="w-[110%] overflow-hidden ml-4 z-10 mb-2 md:pl-0 items-center flex">
			<div ref={contentRef} className="flex w-full space-x-4 overflow-hidden">
				<header className="">Top TVL Gainers:</header>
				<BannerData />
			</div>
		</div>
	);
};

export default RollingBanner;
