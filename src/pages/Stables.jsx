import React from "react";
import { Helmet } from "react-helmet";
import StablesRanking from "../components/rankings/StablesRanking";
import StablesTVLchart from "../components/charts/StablesTVLchart";
import SearchList from "../components/SearchList";

const Stables = () => {
  return (
    <div className="grid grid-cols-1 mx-10 sm:mx-5 text-md">
      <Helmet>
        <title>Stablecoins | DeFi</title>
        <meta name="description" content="Find the best stablecoins" />
      </Helmet>

      <SearchList />

      <header className="text-center my-10 text-4xl italic">
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
