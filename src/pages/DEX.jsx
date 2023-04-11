import React from "react";
import { Helmet } from "react-helmet";
import Ranking from "../components/rankings/Ranking";
import SearchList from "../components/SearchList";

const DEX = () => {
  return (
    <div className="grid grid-cols-1 mx-10 sm:mx-5 text-md">
      <Helmet>
        <title>DEX | DeFi</title>
        <meta
          name="description"
          content="Find the best decentralized exchanges"
        />
      </Helmet>

      <SearchList />

      <header className="text-center my-10 text-4xl italic">
        Top Decentralised Exchanges
      </header>

      <Ranking chain="Dexes" />
    </div>
  );
};

export default DEX;
