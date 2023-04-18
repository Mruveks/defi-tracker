import React from "react";
import { Helmet } from "react-helmet";
import BridgesRanking from "../components/rankings/BridgesRanking";
import SearchList from "../components/SearchList";
import BackButton from "../components/BackButton";

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

      <BackButton />
      <SearchList />

      <div className="h-max my-4 text-white">
        <BridgesRanking />
      </div>
    </div>
  );
};

export default Bridges;
