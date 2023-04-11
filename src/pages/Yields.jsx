import React from "react";
import YieldsRanking from "../components/rankings/YieldsRanking";
import { Helmet } from "react-helmet";
import SearchList from "../components/SearchList";

const Yields = () => {
  return (
    <div className="grid grid-cols-1 mx-10 sm:mx-5 text-md">
      <Helmet>
        <title>Yields | DeFi</title>
        <meta
          name="description"
          content="Discover the highest-yielding decentralized finance (DeFi) projects"
        />
      </Helmet>

      <SearchList />

      <header className="text-center my-10 text-4xl italic">
        Yields Ranking
      </header>
      <YieldsRanking />
    </div>
  );
};

export default Yields;
