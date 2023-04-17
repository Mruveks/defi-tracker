import React from "react";
import { Helmet } from "react-helmet";
import StablesRanking from "../components/rankings/StablesRanking";
import StablesTVLchart from "../components/charts/StablesTVLchart";
import SearchList from "../components/SearchList";
import BackButton from "../components/BackButton";

const Stables = () => {
  return (
    <div className="grid grid-cols-1 mx-10 sm:mx-5 text-md">
      <Helmet>
        <title>Stablecoins | DeFi</title>
        <meta name="description" content="Find the best stablecoins" />
      </Helmet>

      <BackButton />
      <SearchList />

      <header className="flex justify-center text-center items-center capitalize text-white my-10 text-6xl italic">
        Top Stablecoins
      </header>

      <div className="h-max mb-5">
        <StablesTVLchart />
      </div>
      
      <StablesRanking />
    </div>
  );
};

export default Stables;
