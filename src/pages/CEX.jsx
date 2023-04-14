import React from "react";
import { Helmet } from "react-helmet";
import Ranking from "../components/rankings/Ranking";
import SearchList from "../components/SearchList";

const CEX = () => {
  return (
    <div className="grid grid-cols-1 mx-10 sm:mx-5 text-md">
      <Helmet>
        <title>CEX | DeFi</title>
        <meta
          name="description"
          content="Find the best centralized exchanges"
        />
      </Helmet>

      <SearchList />

      <header className="text-center my-5 text-4xl italic">
        Top Centralised Exchanges
      </header>

      <Ranking chain="CEX" />
    </div>
  );
};

export default CEX;
