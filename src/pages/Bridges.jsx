import React from "react";
import { Helmet } from "react-helmet";
import BridgesRanking from "../components/rankings/BridgesRanking";
import SearchList from "../components/SearchList";

const Bridges = () => {
  return (
    <div className="grid grid-cols-1 mx-10 sm:mx-5 text-md">
      <Helmet>
        <title>Bridges | DeFi</title>
        <meta
          name="description"
          content="Find the best DeFi bridges with our comprehensive ranking system."
        />
      </Helmet>

      <SearchList />

      <header className="text-center my-5 text-4xl italic">
        Top Bridges
      </header>

      <BridgesRanking />
    </div>
  );
};

export default Bridges;
