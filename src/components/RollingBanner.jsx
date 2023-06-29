import React, { useEffect, useRef, useState } from "react";
import BannerData from "../utilities/BannerData";
import { flame } from "../assets/AssetsIndex";

const RollingBanner = () => {
	const contentRef = useRef(null);
	const animationRef = useRef(null);
	const [isHovered, setIsHovered] = useState(false);
	const [position, setPosition] = useState(1900);
	const [contentWidth, setContentWidth] = useState(0);
	const [parentWidth, setParentWidth] = useState(0);

	useEffect(() => {
		setContentWidth(contentRef.current.offsetWidth);
		setParentWidth(contentRef.current.parentNode.offsetWidth);
	}, []);

	useEffect(() => {
		const animate = () => {
			const newPosition = position - 2;

			const frame = () => {
				const updatedPosition = isHovered ? position : newPosition;
				contentRef.current.style.transform = `translateX(${updatedPosition}px)`;

				if (updatedPosition <= -contentWidth) {
					setPosition(parentWidth);
				} else {
					setPosition(updatedPosition);
				}

				animationRef.current = requestAnimationFrame(frame);
			};

			animationRef.current = requestAnimationFrame(frame);
		};

		if (!isHovered) {
			animationRef.current = requestAnimationFrame(animate);
		}

		return () => {
			cancelAnimationFrame(animationRef.current);
		};
	}, [isHovered, position, contentWidth, parentWidth]);

	const handleMouseEnter = () => {
		cancelAnimationFrame(animationRef.current);
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div
			className="w-[100%]  sm:mt-10 md:mt-20 overflow-hidden ml-4 z-10 mb-2 md:pl-0 items-center flex"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div
				ref={contentRef}
				className="flex items-center w-full space-x-4 whitespace-nowrap"
				style={{ transform: `translateX(${position}px)` }}
			>
				<header className="flex items-center">
					<img src={flame} alt="flame" className="h-4 pr-1" />
					Top TVL Gainers:
				</header>
				<BannerData />
			</div>
		</div>
	);
};

export default RollingBanner;
