import React from "react";
import { Helmet } from "react-helmet";
import Ranking from "../components/rankings/Ranking";
import SearchList from "../components/SearchList";

const DEX = () => {
  return (
    <div className="grid grid-cols-1 w-full text-md">
      <Helmet>
        <title>DEX | DeFi</title>
        <meta
          name="description"
          content="Find the best decentralized exchanges"
        />
      </Helmet>

      <div className="mx-10">
        <SearchList />
      </div>

      <header className="text-center my-10 text-4xl italic">
        Top Decentralised Exchanges
      </header>

      <Ranking chain="Dexes" />
    </div>
  );
};

export default DEX;
