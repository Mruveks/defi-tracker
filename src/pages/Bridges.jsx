import React from "react";
import { Helmet } from "react-helmet";
import BridgesRanking from "../components/rankings/BridgesRanking";
import SearchList from "../components/SearchList";

const Bridges = () => {
  return (
    <div className="grid grid-cols-1 w-full text-md">
      <Helmet>
        <title>Bridges | DeFi</title>
        <meta
          name="description"
          content="Find the best DeFi bridges with our comprehensive ranking system."
        />
      </Helmet>

      <div className="mx-10">
        <SearchList />
      </div>

      <header className="text-center my-10 text-4xl italic">Top Bridges</header>

      <BridgesRanking />
    </div>
  );
};

export default Bridges;
