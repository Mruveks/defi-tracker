import React from "react";
import { Helmet } from "react-helmet";
import Ranking from "../components/rankings/Ranking";
import SearchList from "../components/SearchList";

const Lending = () => {
  return (
    <div className="grid grid-cols-1 w-full text-md">
      <Helmet>
        <title>Lending | DeFi</title>
        <meta
          name="description"
          content="Find the best decentralized finance (DeFi) lending projects"
        />
      </Helmet>

      <div className="mx-10">
        <SearchList />
      </div>

      <header className="text-center my-10 text-4xl italic">
        Top Lending Protocols
      </header>

      <Ranking chain="Lending" />
    </div>
  );
};

export default Lending;
