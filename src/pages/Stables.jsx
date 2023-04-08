import React from "react";
import { Helmet } from "react-helmet";
import StablesRanking from "../components/rankings/StablesRanking";
import StablesTVLchart from "../components/charts/StablesTVLchart";
import SearchList from "../components/SearchList";

const Stables = () => {
  return (
    <div className="grid grid-cols-1 w-full text-md">
      <Helmet>
        <title>Stablecoins | DeFi</title>
        <meta name="description" content="Find the best stablecoins" />
      </Helmet>

      <div className="mx-10">
        <SearchList />
      </div>

      <header className="text-center my-10 text-4xl italic">
        Top Stablecoins
      </header>

      <div className="h-max mb-5 mx-10 ">
        <StablesTVLchart />
      </div>
      <StablesRanking />
    </div>
  );
};

export default Stables;
