import React from "react";
import { Helmet } from "react-helmet";
import PricePanel from "../components/PricePanel";
import Ranking from "../components/rankings/Ranking";
import SearchList from "../components/SearchList";

const CEX = () => {
  return (
    <div className="grid grid-cols-1 mx-2 lg:mx-10 xl:mx-10 text-md">
      <Helmet>
        <title>CEX | DefiTracker</title>
        <meta
          name="description"
          content="Find the best centralized exchanges"
        />
      </Helmet>

      <BackButton />
      <SearchList />

      <div className="h-max my-4 text-white">
        <Ranking chain="CEX" />
      </div>
    </div>
  );
};

export default CEX;
