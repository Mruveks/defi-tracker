import React from "react";
import YieldsRanking from "../components/rankings/YieldsRanking";
import { Helmet } from "react-helmet";
import SearchList from "../components/SearchList";
import PricePanel from "../components/PricePanel";

const Yields = () => {
  return (
    <div className="grid grid-cols-1 mx-2 lg:mx-10 xl:mx-10 text-md">
      <Helmet>
        <title>Yields | DefiTracker</title>
        <meta
          name="description"
          content="Discover the highest-yielding decentralized finance (DeFi) projects"
        />
      </Helmet>

      <PricePanel />
      <SearchList />

      <YieldsRanking />
    </div>
  );
};

export default Yields;
