import React from "react";
import { Helmet } from "react-helmet";
import BackButton from "../components/BackButton";
import Ranking from "../components/rankings/Ranking";
import SearchList from "../components/SearchList";

const Lending = () => {
  return (
    <div className="grid grid-cols-1 mx-2 lg:mx-10 xl:mx-10 text-md">
      <Helmet>
        <title>Lending | DefiTracker</title>
        <meta
          name="description"
          content="Find the best decentralized finance (DeFi) lending projects"
        />
      </Helmet>

      <BackButton />
      <SearchList />

      <div className="h-max my-4 text-white">
        <Ranking chain="Lending" />
      </div>
    </div>
  );
};

export default Lending;
