import React from "react";
import { Helmet } from "react-helmet";

import TVLranking from "../components/rankings/TVLranking";
import TVLchart from "../components/charts/TVLchart";
import SearchList from "../components/SearchList";

const Home = () => {
  return (
    <div className="grid grid-cols-1 mx-10 sm:mx-5 text-md">
      <Helmet>
        <title>Home | DeFi</title>
        <meta
          name="description"
          content="Discover the best decentralized finance (DeFi) protocols"
        />
      </Helmet>

      <SearchList />

      <header className="text-center my-10 text-4xl italic">
        Top DeFi Protocols
      </header>

      <div className="h-max mb-5 text-white">
        <TVLchart />
      </div>

      <TVLranking />
    </div>
  );
};

export default Home;
