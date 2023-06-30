import React from "react";
import { Helmet } from "react-helmet";
import BridgesRanking from "../components/rankings/BridgesRanking";
import SearchList from "../components/SearchList";
import PricePanel from "../components/PricePanel";

const Bridges = () => {
  return (
    <div className="grid grid-cols-1 mx-2 lg:mx-10 xl:mx-10 text-md">
      <Helmet>
        <title>Bridges | DefiTracker</title>
        <meta
          name="description"
          content="Find the best DeFi bridges with our comprehensive ranking system."
        />
      </Helmet>

      <PricePanel />
      <SearchList />

      <div className="h-max my-4 text-white">
        <BridgesRanking />
      </div>
    </div>
  );
};

export default Bridges;
