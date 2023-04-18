import React from "react";
import { Helmet } from "react-helmet";
import Ranking from "../components/rankings/Ranking";
import SearchList from "../components/SearchList";
import BackButton from "../components/BackButton";
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

      <BackButton />
      <SearchList />

      <div className="h-max my-4 text-white">
        <Ranking chain="Dexes" />
      </div>
    </div>
  );
};

export default DEX;
