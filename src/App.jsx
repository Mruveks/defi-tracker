import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

import "./App.css";

import Navbar from "./components/Navbar";
import MobileNavbar from "./components/MobileNavbar";
import {
	Home,
	Stables,
	Yields,
	Bridges,
	Lending,
	CEX,
	DEX,
} from "./pages/index";
import RollingBanner from "./components/RollingBanner";
import Footer from "./components/Footer";
import ScrollTopButton from "./components/ScrollTopButton";

const ProtocolPage = lazy(() => import("./pages/protocols/ProtocolPage"));
const ChainPage = lazy(() => import("./pages/chains/ChainPage"));
const StablecoinPage = lazy(() => import("./pages/stablecoins/StablecoinPage"));
const ChainOverview = lazy(() => import("./pages/chains/ChainOverview"));
const ProtocolCategories = lazy(() => import("./pages/protocols/ProtocolCategories"));

function App() {
	return (
		<>
			<div className="pl-52 pt-4 pb-8 sm:px-0 md:pl-0 md:mt-0 sm:m-5 bg-gray-800">
				<RollingBanner />
				<Navbar />
				<MobileNavbar />
				<Suspense>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/stablecoins" element={<Stables />} />
						<Route path="/yields" element={<Yields />} />
						<Route path="/bridges" element={<Bridges />} />
						<Route path="/lending" element={<Lending />} />
						<Route path="/cex" element={<CEX />} />
            <Route path="/dex" element={<DEX />} />
            <Route path="/chains" element={<ChainOverview />} />
            <Route path="/protocol/categories" element={<ProtocolCategories />} />

						<Route
							key="/protocol/:protocolId"
							path="/protocol/:protocolId"
							element={<ProtocolPage />}
						/>
						<Route
							key="/chain/:chainId"
							path="/chain/:chainId"
							element={<ChainPage />}
						/>
						<Route
							key="/stablecoins/:stableId"
							path="/stablecoins/:stableId"
							element={<StablecoinPage />}
						/>
					</Routes>
				</Suspense>
				<div className="block md:hidden lg:hidden xl:hidden fixed left-1 bottom-12">
					<ScrollTopButton />
				</div>
			</div>
			<Footer />
		</>
	);
}

export default App;
