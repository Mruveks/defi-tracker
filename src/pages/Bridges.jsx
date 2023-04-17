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

      <header className="flex justify-center text-center items-center capitalize text-white my-10 text-6xl italic">
        Top Bridges
      </header>

      <BridgesRanking />
    </div>
  );
};

export default Bridges;
