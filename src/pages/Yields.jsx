import React from "react";
import YieldsRanking from "../components/rankings/YieldsRanking";
import { Helmet } from "react-helmet";
import SearchList from "../components/SearchList";
import BackButton from "../components/BackButton";

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

      <BackButton />
      <SearchList />

      <header className="flex justify-center text-center items-center capitalize text-white my-10 text-6xl italic">
        Pools Ranking
      </header>
      <YieldsRanking />
    </div>
  );
};

export default Yields;
